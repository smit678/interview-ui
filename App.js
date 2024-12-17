import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneNumberScreen from './screens/Phone';
import OTPScreen from './screens/EnterOTP';
import Personalinfo from './screens/PersonalInfo';
import Camera from './screens/Camera';
import Aadhar from './screens/Aadhar';
import Greeting from './screens/Greeting';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhoneNumber">
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Personalinfo" component={Personalinfo} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Aadhar" component={Aadhar} />
        <Stack.Screen name="Greeting" component={Greeting} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
