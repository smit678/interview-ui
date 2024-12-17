// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // Updated import
// import DatePicker from '@react-native-community/datetimepicker';
// import Cbutton from './Button';
// import { camera } from './Camera';



// const PersonalInfo = ({ navigation ,route }) => {
  
//     // Form state
  
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [gender, setGender] = useState('male');
//   const [dob, setDob] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [address, setAddress] = useState('');
  

 
                                                                                                                            

//   //handle navigate
//   const navigateCam = ()=>{
    
//     return <camera/>
    
    
    
//     // navigation.navigate('Camera',{});
//   }


//   // Handle form submission
//   const handleSubmit = () => {
//     if (!firstName || !lastName || !address) {
//       Alert.alert("Error", "Please fill all required fields.");
//       return;
//     }
//     const formData = {address,dob,gender,lastName,firstName };
//     console.log("Form Data Submitted:", formData);
//     setFirstName('')
//     setLastName('')
//     setGender('')
//     setDob(null)
//     setAddress('')
//     // Further logic for form submission (e.g., sending to a backend) can be added here.
//     Alert.alert("Success", "Personal information submitted!");
    
    
//   };

//   // Handle date picker change
//   const onChangeDate = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setDob(selectedDate.toLocaleDateString());
//     }
//   };

//   // Show Date Picker when Date of Birth input is clicked
//   const showDatepicker = () => {
//     setShowDatePicker(true);
//   };

//   return (<>
//       <Text style={styles.title}>Personal Information Form</Text>
//     <View style={styles.container}>
//      <View style={styles.div}>
//            <View style={styles.circle}>
//            {/* <Image source={{uri:uri}} style={styles.photo}/> */}
//              <Cbutton  icon={'camera'} onPress={navigateCam }   /> 
//            </View>
//      </View>
//       {/* First Name */}
//       <TextInput
//         style={styles.input}
//         placeholder="First Name"
//         value={firstName}
//         onChangeText={setFirstName}
//       />

//       {/* Last Name */}
//       <TextInput
//         style={styles.input}
//         placeholder="Last Name"
//         value={lastName}
//         onChangeText={setLastName}
//       />

//       {/* Gender Picker */}
//       <Text>Gender</Text>
//       <Picker
//         selectedValue={gender}
//         style={styles.picker}
//         onValueChange={(itemValue) => setGender(itemValue)}
//       >
//         <Picker.Item label="Male" value="male" />
//         <Picker.Item label="Female" value="female" />
//         <Picker.Item label="Other" value="other" />
//       </Picker>

//       {/* Date of Birth */}
//       <Text>Date of Birth</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Select Date of Birth"
//         value={ dob}
//         //Moment(dob).format('dd/mm/yyyy')
//         // editable={false}
//         onTouchStart={showDatepicker}
//       />

//       {/* Date Picker Modal */}
//       {showDatePicker && (
//         <DatePicker
//           value={new Date()}
//           mode="date"
//           // display="calendar" // Use calendar mode for date picking
//           onChange={onChangeDate}
//         />
//       )}

//       {/* Address */}
//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={address}
//         onChangeText={setAddress}
//         multiline
//       />

      
//       <Button title="Submit" color="#7e57c2"  onPress={handleSubmit} />
//     </View></>
//   );
// }

// export default PersonalInfo

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     // justifyContent:'center',
//     // alignItems:'center',
//     backgroundColor: '#f7f7f7',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',

//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingLeft: 10,
//     fontSize: 16,
//   },
//   picker: {
//     height: 60,
//     width: '100%',
//     marginBottom: 10,
//   },
//   circle: {
//     marginBottom: 20,
//     borderWidth:10,
//     borderColor:'#b388ff',
//     borderRadius: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height:200,
//     width: 200,
//     backgroundColor: '#5d6d7e',
//   },
//   div: {

//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button:{
//     color: '#7e57c2',
//    backgroundColor:'#7e57c2',
//   },
//   photo: {
//     height:300,
//     width: 200,
//   }
// });

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Entypo} from '@expo/vector-icons'


const PersonalInfo = ({ navigation }) => {
  // Use one state to hold all the form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    address: '',
    selfieUri: null, // store the selfie URI here
  });

  const [hasPermission, setHasPermission] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Function to update form data (for text inputs)
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Take Selfie function
  const takeSelfie = async () => {
    const result = await ImagePicker.launchCameraAsync({  
      allowsEditing: true,                               /////////////////////////////////////////////
      aspect: [1, 1], // Circle aspect ratio             /////////////////////////////////////////////
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.front, // Use front camera for selfies
    });

    if (!result.canceled) {
      setFormData((prevData) => ({
        ...prevData,
        selfieUri: result.assets[0].uri, // Update the selfie URI in the state
      }));
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


 const handleSubmit = ()=>{
  if (!formData || !formData.selfieUri) {
        Alert.alert("Error", "Please fill all required fields.")
         return;
        }
        setFormData('')
        console.log(formData)
        Alert.alert("Success", "Personal information submitted!")
         navigation.navigate('Aadhar',{});
 }


 /////////////////////////////////////////////////////////////////////////////////////////////////////
 // Handle gender change
 const handleGenderChange = (selectedGender) => {
  setFormData((prevData) => ({
    ...prevData,
    gender: selectedGender, // Update gender in the formData
  }));
};

if (hasPermission === null) {
  return <Text>Requesting camera permission...</Text>;
}

if (hasPermission === false) {
  return <Text>No access to camera</Text>;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   // Handle Date of Birth change
   const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dob; // If no date is selected, keep the previous one
    setShowDatePicker(Platform.OS === 'ios' ? true : false); // Hide date picker on Android
    const formattedDate = currentDate.toLocaleDateString();
    setFormData((prevData) => ({
      ...prevData,
      dob: formattedDate, // Set the formatted date in the formData
    }));
  };

  return (
    <View style={styles.container}>
      {/* Selfie Section */}
      <TouchableOpacity onPress={takeSelfie} style={styles.selfieContainer}>
        {formData.selfieUri ? (
          <Image source={{ uri: formData.selfieUri }} style={styles.selfieImage} />
        ) : (
          <View style={styles.selfiePlaceholder}>
            <Entypo name={'camera'} size={28} color={'#000'}/>
            <Text style={styles.selfiePlaceholderText} >Take a selfie</Text>
          </View>
        )}
        {!formData.selfieUri && <Text style={styles.cameraButtonText}></Text>}
      </TouchableOpacity>

      {/* Form Inputs */}
      <View>
      <Text style={styles.text}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
      />
      </View>
      <View>
      <Text style={styles.text}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => handleInputChange('lastName', text)}
      />
      </View>

{/*  ///////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
        {/* Gender Selection - Horizontal Layout */}
      <View style={styles.genderContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioRow}> {/* Container for horizontal layout */}
          {/* Male Option */}
          <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={() => handleGenderChange('male')}
          >
            <View style={styles.radioButton}>
              {formData.gender === 'male' && <View style={styles.selectedCircle} />}
            </View>
            <Text style={styles.radioLabel}>Male</Text>
          </TouchableOpacity>

          {/* Female Option */}
          <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={() => handleGenderChange('female')}
          >
            <View style={styles.radioButton}>
              {formData.gender === 'female' && <View style={styles.selectedCircle} />}
            </View>
            <Text style={styles.radioLabel}>Female</Text>
          </TouchableOpacity>

          {/* Other Option */}
          <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={() => handleGenderChange('other')}
          >
            <View style={styles.radioButton}>
              {formData.gender === 'other' && <View style={styles.selectedCircle} />}
            </View>
            <Text style={styles.radioLabel}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


      {/* <View>
      <Text>Gender</Text>
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={formData.gender}
        onChangeText={(text) => handleInputChange('gender', text)}
      />
      </View> */}


        {/* Date of Birth Picker */}
     

      <View>
      <Text style={styles.text}>Date of Birth</Text>
        {/* Date of Birth Picker */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={styles.datePickerText}>
          {formData.dob ? formData.dob :'Select DOB'}
        </Text>
      </TouchableOpacity>

      {/* Show DateTimePicker if showDatePicker is true */}
      {showDatePicker && (
        <DateTimePicker
          value={new Date(Date.now())} // Use the selected DOB or current date
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      </View>
      <View>
        <Text style={styles.text}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      </View>
      
      
      
      
     
      <Button title="Submit" color="#7e57c2"  onPress={handleSubmit} />
      {/* <Button title="Submit" onPress={() => alert('Form Submitted') } /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  selfieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  selfieImage: {
    width: 180,
    height: 180,
    borderRadius: 90, // Circle shape
  },
  selfiePlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90, // Circle shape
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selfiePlaceholderText: {
    color: '#aaa',
    fontSize: 14,
  },
  cameraButtonText: {
    position: 'absolute',
    fontSize: 30,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  datePickerText: {
    fontSize: 14,
    color: '#555',
    padding: 8,
    paddingLeft:0,
  },
  genderContainer: {
    marginBottom: 20, // Added more space between Gender and other inputs
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, // Space between label and radio options
  },
  radioRow: {
    flexDirection: 'row', // This arranges the radio options in a horizontal row
    justifyContent: 'space-between', // Distribute space evenly between radio buttons
    marginBottom: 10, // Space below the radio options
    marginRight:100,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7e57c2', // Green color for the selected option
  },
  radioLabel: {
    fontSize: 16,
  },
});
export default PersonalInfo ;