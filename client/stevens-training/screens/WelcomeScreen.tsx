import * as React from 'react';
import { ImageBackground, StyleSheet  } from 'react-native';
import { Text, View, } from '../components/Themed';
export let socket: any; 
import { Surface } from 'react-native-paper';
import styled from 'styled-components/native';
import image from '../assets/images/banner.jpg';
const WelcomeContainer = styled.View`
  flex: 1;
  background-color: #171717;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const WelcomeText = styled.Text`
  font-size: 25px;
  color: white;
  font-weight: bolder;
`;

export default function WelcomeScreen() {
  return (
    <WelcomeContainer>
        <Surface style={{ maxWidth: "800px", width: "90%", height: "500px" }}>
            <ImageBackground source={image} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{marginLeft: "50px", color: "#DDDDDD", fontSize: 70, fontWeight: "500" }}>Welcome</Text>
            </ImageBackground>
          </Surface>
    </WelcomeContainer>      
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













