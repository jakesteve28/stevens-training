import * as React from 'react';
import { ImageBackground, StyleSheet  } from 'react-native';
import { Text, View, } from '../components/Themed';
export let socket: any; 
import { Button, Card } from 'react-native-paper';
import image from '../assets/images/usonofa.jpg'; 

export default function WelcomeScreen() {
  return (
    <View style={{ height: "100%" }}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.welcome}>
          <Text style={{ fontSize: "40pt", marginTop: "20px" }}>Stevens Training</Text>
          <Text>
            
          </Text>
          {/* <Card style={styles.card}>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{ height: "100%" }} />
          </Card> */}
        </View>
        <View style={styles.welcomebuttons}>
          <Button mode="contained" icon="login" style={styles.loginbutton} labelStyle={styles.loginbuttonlabel}>Login</Button>
          <Button mode="contained" style={styles.loginbutton} labelStyle={styles.loginbuttonlabel}>Sign Up</Button>
        </View>
        </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { 
    width: "95%",
    height: "95%",
     opacity: 0.5, 
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
  loginbutton: {
    padding: 20,
    fontSize: 30,
    width: '60%',
    margin: 5,
    opacity: .88,
    backgroundColor: "#222222",
  },
  loginbuttonlabel: {
    fontSize: 30
   },
   welcome: {
    width: "100%", 
    backgroundColor: "transparent",
    height: '250px',
    alignItems: "center"
   }, 
   welcomebuttons: {
    marginTop: 'auto',
    width: "100%", 
    backgroundColor: "transparent",
    alignItems: "center",
    marginBottom: "30px"
   },
   image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#191919"
  },
});













