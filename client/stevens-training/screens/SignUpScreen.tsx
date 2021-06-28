import * as React from 'react';
import { StyleSheet  } from 'react-native';
import { Text, View, } from '../components/Themed';
export let socket: any; 
export default function SignUpScreen() {
  return (
    <View style={styles.container}>
        <Text> Sign Up </Text>
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
