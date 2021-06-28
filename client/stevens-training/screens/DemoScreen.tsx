import * as React from 'react';
import { StyleSheet  } from 'react-native';
import { Text, View, } from '../components/Themed';
export let socket: any; 
export default function DemoScreen() {
  return (
    <View style={styles.container}>
        <Text> Demo </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#191919"
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













