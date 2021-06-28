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
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { BottomTabParamList, NewUserScreenParamList, SignUpScreenParamList, WelcomeScreenParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      >
        <BottomTab.Screen
          component={WelcomeNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
          }}
          name="Welcome"
        />
        <BottomTab.Screen
          component={SignUpNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
          }}
          name="SignUp"
        />
       <BottomTab.Screen
          component={NewUserNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
          }}
          name="Login"
        />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const NewUserStack = createStackNavigator<NewUserScreenParamList>();

function NewUserNavigator() {
  return (
    <NewUserStack.Navigator>
      <NewUserStack.Screen
        component={LoginScreen}
        options={{ headerTitle: 'Welcome to Stevens Training' }}
        name="LoginScreen"
      />
    </NewUserStack.Navigator>
  );
}

const SignUpStack = createStackNavigator<SignUpScreenParamList>();

function SignUpNavigator() {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        component={SignUpScreen}
        options={{ headerTitle: 'Welcome to Stevens Training' }}
        name="SignUpScreen"
      />
    </SignUpStack.Navigator>
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