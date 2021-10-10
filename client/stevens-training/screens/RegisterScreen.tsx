import * as React from 'react';
import { ImageBackground, StyleSheet  } from 'react-native';
import styled from 'styled-components/native';
import { Surface, Text,TextInput  } from 'react-native-paper';
import RegisterForm from '../components/forms/register';
const SignUpContainer = styled.View`
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
  height: 100%;
  width: 100%; 
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;
const SignUpImageContainer = styled.View`
  align-self: flex-start;
  background-color: blue;
  flex: 1;
`; 
export function SignUp() {
  return (
    <SignUpContainer>
      <SignUpImageContainer></SignUpImageContainer>
      <SignUpFormContainer></SignUpFormContainer>
    </SignUpContainer>
  )
}
const surfaceStyle = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    width: 500, 
    height: 500,
    flex: 1
  },
});
const SignUpFormContainer = () => (
  <Surface style={surfaceStyle.surface}>
     <Text>Surface</Text>
  </Surface>
);
const RegisterContainer = styled.View`
  flex: 1;
  background-color: #171717;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const RegisterText = styled.Text`
  font-size: 25px;
  color: white;
  font-weight: bolder;
`;
export default function RegisterScreen() {
  return (
    <RegisterContainer>
        <Surface style={{ maxWidth: "800px", width: "90%", height: "500px", overflowY: "scroll" }}>
          <RegisterText>Sign up!</RegisterText>
          <RegisterForm />
        </Surface>
    </RegisterContainer>      
  );
}

