import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./components/containers/views/home";
import LoginScreen from "./components/containers/views/login";
import SignUpScreen from "./components/containers/views/signup";
import { selectLoggedIn } from "./features/user/userSlice";
import { AnimatedSwitch, spring } from 'react-router-transition';

import './animated-switch.css';
import StevensNavBar from "./components/NavBar";
import ProfileScreen from "./components/containers/views/profile";
import Workouts from "./components/containers/views/workouts";
import { SingleWorkoutView } from "./components/containers/views/singleworkout";

function mapStyles(styles: any) {
  return {
    opacity: styles.opacity,
    transform: `translateX(${styles.scale}px)`,
  };
}

function bounce(val: any) {
  if(val < 0) return -1000;
  if(val == 1000) return 1000;
  return spring(val, {
    stiffness: 100,
    damping: 22,
  });
}

const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1000,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(-0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};


export default function AppRouter() {
  const loggedIn = useSelector(selectLoggedIn); 
  return (
    <Router>
        <StevensNavBar />
            <AnimatedSwitch
              atEnter={bounceTransition.atEnter}
              atLeave={bounceTransition.atLeave}
              atActive={bounceTransition.atActive}
              mapStyles={mapStyles}
              className="switch-wrapper"
            >
                <Route path="/app">

                </Route>
                <Route path="/login">
                  <LoginScreen />
                </Route>
                <Route path="/signup">
                  <SignUpScreen />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path={'/workouts/:workoutId'} component={SingleWorkoutView} />
                <Route path="/workouts" component={Workouts} exact/>
                <Route path="/dashboard">
                </Route>
                <Route path="/profile">
                  <ProfileScreen></ProfileScreen>
                </Route>
                <Route path="/">
                  { loggedIn ? <Redirect to="/app" /> : <LoginScreen />}
                </Route>
            </AnimatedSwitch>
    </Router>
  );
}