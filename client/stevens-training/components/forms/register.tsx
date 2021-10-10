import React, { useState } from "react";
import { TextInput, Button } from 'react-native-paper';

export default function RegisterForm(){
    const [fname, setfname] = useState(""); 
    const [lname, setlname] = useState(""); 
    const [username, setusername] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [pw1, setpw1] = useState(""); 
    const [pw2, setpw2] = useState(""); 
    const [agreeTerms, setAgreeTerms] = useState(false); 
    const [submitting, setSubmitting] = useState(false); 
    const submit = () => {

    }
    return (
        <>
        <TextInput
            label="First Name"
            value={fname}
            onChangeText={text => setfname(text)}
            mode="outlined"
            outlineColor="#AAAAAA"
            style={{
                padding: 30, 
                marginTop: 10, 
                marginBottom: 10, 
                width: "80%"
            }}
        />
        <TextInput
            label="Last Name"
            value={lname}
            onChangeText={text => setlname(text)}
            mode="outlined"
            outlineColor="#AAAAAA"
            style={{
                padding: 30, 
                marginTop: 10, 
                marginBottom: 10, 
                width: "80%"
            }}
        />
        <TextInput
            label="Desired username"
            value={username}
            onChangeText={text => setusername(text)}
            mode="outlined"
            outlineColor="#AAAAAA"
            style={{
                padding: 30, 
                marginTop: 10, 
                marginBottom: 10, 
                width: "80%"
            }}
        />
          <TextInput
            label="Valid Email Address"
            value={email}
            onChangeText={text => setEmail(text)}
            mode="outlined"
            outlineColor="#AAAAAA"
            style={{
                padding: 30, 
                marginTop: 10, 
                marginBottom: 10, 
                width: "80%"
            }}
        />
        <TextInput
            label="Desired Password"
            value={pw1}
            onChangeText={text => setpw1(text)}
            mode="outlined"
            outlineColor="#AAAAAA"
            style={{
                padding: 30, 
                marginTop: 10, 
                marginBottom: 10, 
                width: "80%"
            }}
        />
         <TextInput
            label="Confirm Password"
            value={pw2}
            onChangeText={text => setpw2(text)}
            mode="outlined"
            outlineColor="#AAAAAA"
            style={{
                padding: 30, 
                marginTop: 10, 
                marginBottom: 10, 
                width: "80%"
            }}
        />
        <Button onPress={() => submit()} mode="contained" color="#DDDDDD">
            Register
        </Button>
        </>
    )
}