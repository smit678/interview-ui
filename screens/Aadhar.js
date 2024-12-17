import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, Button } from 'react-native';

const AadhaarInputBoxes = ({navigation}) => {
  const [segments, setSegments] = useState(['', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null)];

  // Handle input changes
  const handleInputChange = (text, index) => {
    const newSegments = [...segments];
    newSegments[index] = text.replace(/[^0-9]/g, ''); // Allow only numbers

    if (text.length === 4 && index < 2) {
      inputRefs[index + 1].current.focus(); // Move to the next input box
    }
    setSegments(newSegments);
  };

  // Validate Aadhaar number
  const validateAadhaar = () => {
    const aadhaarNumber = segments.join('');
    if (/^\d{12}$/.test(aadhaarNumber)) {
      Alert.alert(`'Success', Valid Aadhaar Number: ${aadhaarNumber}`);
      navigation.navigate('Greeting',{});
    } else {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Aadhaar Number:</Text>
      <View style={styles.inputContainer}>
        {segments.map((segment, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.input}
            value={segment}
            maxLength={4}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && segment === '' && index > 0) {
                inputRefs[index - 1].current.focus(); // Move to the previous input box
              }
            }}
          />
        ))}
      </View>
      <Button title="Validate" onPress={validateAadhaar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
});

export default AadhaarInputBoxes;