import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput  } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, View, } from '../components/Themed';
import Constants from 'expo-constants';
import { login } from '../store/features/userSlice';
import io from 'socket.io-client'; 
export let socket: any; 

export default function LoginScreen() {
  const [socketConnected, setSocketConnected] = useState(false); 
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [username, setUsername] = useState(""); 
  const [pw, setPW] = useState("");  
  const [userInfo, setUserInfo] = useState("");
  const dispatch = useDispatch(); 
  const socketOptions = {
    transportOptions: {
        polling: {
            extraHeaders: {
                credentials: "include"
            }
        }
    },
    reconnectionAttempts: 5
}
  useEffect(() => {
    if(!socketConnected) {

    }
  }, [userLoggedIn]); 
  const attemptLogin = async (userName: string, pw: string) => {
    const res = await fetch(`https://localhost:3000/signon/login`, {
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
        setUserInfo(JSON.stringify(user)); 
        dispatch(login(user)); 
        console.log(`attemping socket io login`)
        socket = io(`https://localhost:3000/notifications`, socketOptions); 
        if(!socket) {
          console.log("Socket not going"); 
          return;
        }
        console.log("socket going ", socket);
        socket.emit("test", { msg: "" });
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
            value={pw}
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
        <Text>{userInfo}</Text>
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
