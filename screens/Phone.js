import React, { useState , useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PhoneNumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
 

   
 // This effect will run when the phoneNumber changes to a length of 10
 useEffect(() => {
  if (phoneNumber.length === 10) {
    // Navigate to OTP screen and pass the phone number as a parameter
    navigation.navigate('OTP', { phoneNumber });
  }
}, [phoneNumber]);

  // const handlePhoneNumberSubmit = () => {
  //   if (phoneNumber.length === 10) {
  //     // Navigate to OTP screen and pass the phone number as a parameter
  //     navigation.navigate('OTP', { phoneNumber });
  //   } else {
  //     alert('Please enter a valid phone number');
  //   }
  // };
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Phone Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={10} // Limit input to 10 digits
      />

 {/* {phoneNumber.length === 10 ?
 <View>{navigation.navigate('OTP', { phoneNumber })}</View>
     : <Text></Text>
  } */}
      
      {/* <Button title="Next" onPress={handlePhoneNumberSubmit} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
  },
});

export default PhoneNumberScreen;
