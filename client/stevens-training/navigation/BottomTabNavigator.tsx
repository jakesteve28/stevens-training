/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SignInScreen from '../screens/SignInScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { BottomTabParamList, HomeScreenParamList, NewUserScreenParamList, NotificationsScreenParamList, SettingsScreenParamList, SignInScreenParamList, SocialScreenParamList, WelcomeScreenParamList } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/features/userSlice';
import { useEffect, useState } from 'react';
import HomeScreen from '../screens/Home';
import SocialScreen from '../screens/Social';
import NotificationsScreen from '../screens/Notifications';
import SettingsScreen from '../screens/Settings';
import RegisterScreen from '../screens/RegisterScreen';
import { MaterialIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const BottomTabsNotLoggedIn = () => {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: '#757ce8',
                       activeBackgroundColor: "#252525",     
                       inactiveBackgroundColor: "#191919",
                       labelPosition: 'below-icon', 
                       style: { position: 'absolute' },
                       labelStyle: { paddingBottom: "5px", fontWeight: "bold" }
      }}
      >
        <BottomTab.Screen
          component={WelcomeNavigator}
          name="Welcome"
          options={{ 
            tabBarIcon: () => <MaterialIcons name="fitness-center" size={24} color="white" />
          }}
        />
        <BottomTab.Screen
          component={SignInNavigator}
          name="Sign In"
          options={{ 
            tabBarIcon: () =>  <SimpleLineIcons name="login" size={24} color="white" />
          }}
        />
      <BottomTab.Screen
          component={NewUserNavigator}
          name="Register"
          options={{ 
            tabBarIcon: () =>  <FontAwesome5 name="user-check" size={24} color="white" />
          }}
        />
    </BottomTab.Navigator>
  )
}

const BottomTabsLoggedIn = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      >
        <BottomTab.Screen
          component={WelcomeNavigator}
          name="Home"
          options={{ 
            tabBarIcon: () => <MaterialIcons name="fitness-center" size={30} color="white" />
          }}
        />
        <BottomTab.Screen
          component={SignInNavigator}
          name="Social"
        />
        <BottomTab.Screen
          component={NewUserNavigator}
          name="Notifications"
        />
        <BottomTab.Screen
          component={NewUserNavigator}
          name="Settings"
        />
    </BottomTab.Navigator>
  )
}

export default function BottomTabNavigator() {
  const dispatch = useDispatch(); 
  const user = useSelector(selectUser); 
  const [loggedIn, setLoggedIn] = useState(false); 
  useEffect(() => {
    if(user) {
      setLoggedIn(true);
      return; 
    } else setLoggedIn(false); 
  }, [user]); 
  return (loggedIn) ? (<BottomTabsNotLoggedIn></BottomTabsNotLoggedIn>) : (<BottomTabsLoggedIn></BottomTabsLoggedIn>) 
}

const NewUserStack = createStackNavigator<NewUserScreenParamList>();

function NewUserNavigator() {
  return (
    <NewUserStack.Navigator>
      <NewUserStack.Screen
        component={RegisterScreen}
        options={{ headerTitle: 'Welcome to Stevens Training' }}
        name="RegisterScreen"
      />
    </NewUserStack.Navigator>
  );
}

const SignInStack = createStackNavigator<SignInScreenParamList>();

function SignInNavigator() {
  return (
    <SignInStack.Navigator>
      <SignInStack.Screen
        component={SignInScreen}
        options={{ headerTitle: 'Welcome to Stevens Training' }}
        name="SignInScreen"
      />
    </SignInStack.Navigator>
  )
}

const WelcomeStack = createStackNavigator<WelcomeScreenParamList>(); 

function WelcomeNavigator() {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen
        component={WelcomeScreen}
        options={{ headerTitle: 'Welcome to Stevens Training' }}
        name="WelcomeScreen"
      />
    </WelcomeStack.Navigator>
  )
}

const HomeStack = createStackNavigator<HomeScreenParamList>(); 

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
        name="HomeScreen"
      />
    </HomeStack.Navigator>
  )
}

const SocialStack = createStackNavigator<SocialScreenParamList>(); 

function SocialNavigator() {
  return (
    <SocialStack.Navigator>
      <SocialStack.Screen
        component={SocialScreen}
        options={{ headerTitle: 'Places and People' }}
        name="SocialScreen"
      />
    </SocialStack.Navigator>
  )
}

const NotificationsStack = createStackNavigator<NotificationsScreenParamList>(); 

function NotificationsNavigator() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        component={NotificationsScreen}
        options={{ headerTitle: 'Notifications' }}
        name="NotificationsScreen"
      />
    </NotificationsStack.Navigator>
  )
}

const SettingsStack = createStackNavigator<SettingsScreenParamList>(); 

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
        name="SettingsScreen"
      />
    </SettingsStack.Navigator>
  )
}