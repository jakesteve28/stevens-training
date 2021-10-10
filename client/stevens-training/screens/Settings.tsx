import * as React from 'react';
import { StyleSheet  } from 'react-native';
import { Text, View, } from '../components/Themed';

export default function SettingsScreen() {
  return (
    <View style={{ height: "100%" }}>
        <Text>Settings</Text>
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













