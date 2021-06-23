import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput  } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, View, } from '../components/Themed';
import Constants from 'expo-constants';
import { login } from '../store/features/userSlice';
import { io } from 'socket.io-client'; 
export let socket: any; 

export default function LoginScreen() {
  const [socketConnected, setSocketConnected] = useState(false); 
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [username, setUsername] = useState(""); 
  const [pw, setPW] = useState("");  
  const dispatch = useDispatch(); 
  useEffect(() => {
    if(!socketConnected) {

    }
  }, [userLoggedIn]); 
  const attemptLogin = async (userName: string, pw: string) => {
    const res = await fetch(`${Constants.manifest.extra?.domain}/signon/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            userName: username, 
            password: pw
        })
    })
    if(res) {
        const user = await res.json(); 
        console.log("Successfully logged in user", user); 
        dispatch(login(user)); 
        //socket = io(); 
    }
  }
  const onChangeText = (text: string) => {
      setUsername(text)
  }
  const onChangePWText = (text: string) => {
    setPW(text)
}
  const onPressLogin = () => {
      attemptLogin(username, pw); 
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Stevens Training!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
       <Text>Connected? {socketConnected ? "Yea": "Na"}</Text>
       <TextInput 
            placeholder="Username"
            onChangeText={text => onChangeText(text)}
            value={username}
            style={{
                margin: 10,
                padding: 10,
                backgroundColor: "#AAAAAA",
                color: "black" 
            }}
       ></TextInput>
          <TextInput 
            placeholder="Password"
            passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
            onChangeText={text => onChangePWText(text)}
            value={username}
            style={{
                margin: 10,
                padding: 10,
                backgroundColor: "#AAAAAA",
                color: "black" 
            }}
       ></TextInput>
       <Button
        onPress={onPressLogin}
        title="Login"
        color="#AAAAAA"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
