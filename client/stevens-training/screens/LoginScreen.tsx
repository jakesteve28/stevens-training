import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, } from '../components/Themed';
import { login, selectUser } from '../store/features/userSlice';
import io from 'socket.io-client'; 
export let socket: any; 
export default function LoginScreen() {
  const [socketConnected, setSocketConnected] = useState(false); 
  const [username, setUsername] = useState(""); 
  const [pw, setPW] = useState("");  
  const dispatch = useDispatch(); 
  const user = useSelector(selectUser);
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
        console.log(`Attemping socket io login`)
        socket = io(`https://localhost:3000/notifications`, socketOptions); 
        if(!socket) {
          console.log("Socket not going"); 
          return;
        }
        dispatch(login(user)); 
        socket.emit("test", { msg: "" }, () => {
          setSocketConnected(true);
        });
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
                color: "black",
                marginBottom: 25
            }}
       ></TextInput>
          <TextInput 
            placeholder="Password"
            passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
            onChangeText={text => onChangePWText(text)}
            textContentType="password"
            value={pw}
            style={{
                margin: 10,
                padding: 10,
                backgroundColor: "#AAAAAA",
                color: "black" ,
                marginBottom: 25
            }}
       ></TextInput>
       <Button
          onPress={onPressLogin}
          title="Login"
          color="#AAAAAA"
        />
        <Text style={{ fontSize: 18, marginTop: 15, marginBottom: 15, padding: 25, backgroundColor: "#191919", color: "#DDDDDD", width: 300 }}>
            {(user.firstName !== "") ? "Welcome, " + user.firstName : "" }
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "transparent"
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
