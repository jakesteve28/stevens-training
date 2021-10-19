import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./components/containers/home";
import Login from "./components/route-containers/Login";
import { selectLoggedIn } from "./features/user/userSlice";

export default function AppRouter() {
  const loggedIn = useSelector(selectLoggedIn); 
  return (
    <Router>
        <Switch>
          <Route path="/app">

          </Route>
          <Route path="/about">

          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/dashboard">

          </Route>
          <Route path="/">
            { loggedIn ? <Redirect to="/app" /> : <Login />}
          </Route>
        </Switch>
    </Router>
  );
}