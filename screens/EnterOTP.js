// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';

// const OTPScreen = ({ route, navigation }) => {
//   const { phoneNumber } = route.params;  // Get phone number from params
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);  // Store OTP in an array of 6 empty strings

//   // Initialize refs for each OTP input field using useRef
//   const inputRefs = useRef([]);
//   for (let i = 0; i < 6; i++) {
//     inputRefs.current[i] = inputRefs.current[i] || React.createRef();
//   }

//   // Handle OTP input change
//   const handleChange = (num, index) => {
//     let newOtp = [...otp];
//     newOtp[index] = num;
//     setOtp(newOtp);

//     // Move focus to the next input if text is entered
//     if (num && index < otp.length - 1) {
//       inputRefs.current[index + 1].current.focus();
//     }
//   };
//   useEffect(() => {
//     const otpString = otp.join('');
//     if (otpString.length === 6) {
//       // Navigate to OTP screen and pass the phone number as a parameter
//      navigation.navigate('Personalinfo',{})
//     }
//   }, [otp]);

//   // // Submit OTP
//   // const handleSubmit = () => {
//   //   const otpString = otp.join('');
//   //   console.log('Entered OTP:', otpString);
//   //   navigation.navigate('Personalinfo',{otpString});
//   //   // Add logic here to verify OTP, for now, we just log it.
//   // };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter OTP for : {phoneNumber}</Text>

//       <View style={styles.inputContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={inputRefs.current[index]}
//             style={styles.input}
//             value={digit}
//             keyboardType="number-pad"
//             maxLength={1}
//             onChangeText={(num) => handleChange(num, index)}
//             autoFocus={index === 0}  // Automatically focus on the first input field
//           />
//         ))}
//       </View>

//       {/* <Button title="Submit OTP" onPress={handleSubmit} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 30,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//     marginBottom: 20,
//   },
//   input: {
//     width: 50,
//     height: 50,
//     textAlign: 'center',
//     fontSize: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
// });

// export default OTPScreen;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Use this for navigation

const OTPScreen = ({ route }) => {
  // States for OTP, Timer, and Resend State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // OTP inputs (6 digits)
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(59);
  const [canResend, setCanResend] = useState(false); // Controls the Resend OTP button visibility
  const [isOtpResent, setIsOtpResent] = useState(false); // To track if OTP has been resent
  const { phoneNumber } = route.params; // Get phone number from params
  const inputRefs = useRef([]); // Refs for OTP Input Fields
  const navigation = useNavigation(); // Hook to access navigation

  useEffect(() => {
    // Set up a timer that counts down from 59 seconds
    if (isTimerActive) {
      const timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev === 0) {
            clearInterval(timer);
            setIsTimerActive(false); // Stop the timer once it reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on component unmount
    }
  }, [isTimerActive]);

  useEffect(() => {
    // Enable the Resend OTP button after 5 seconds
    const resendTimer = setTimeout(() => {
      setCanResend(true);
    }, 5000); // 5 seconds delay for Resend OTP

    return () => clearTimeout(resendTimer); // Cleanup timeout on unmount
  }, []);

  // Handle OTP input change
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input automatically when the user enters a digit
    if (text !== "" && index < 5) {
      inputRefs.current[index + 1].focus(); // Focus the next input
    }

    // Check if all OTP fields are filled and navigate automatically
    if (newOtp.every((digit) => digit !== "")) {
      navigateToNextScreen(); // Navigate once OTP is complete
    }
  };

  // Handle Backspace when the user deletes a digit
  const handleBackspace = (index) => {
    if (otp[index] === "") {
      // If current field is empty and the user presses backspace, focus the previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
    setSecondsRemaining(59); // Reset timer
    setIsTimerActive(true); // Start the timer again
    setCanResend(false); // Disable Resend OTP button again
    setIsOtpResent(true); // Mark OTP as resent
    setTimeout(() => setCanResend(true), 5000); // Reset resend after another 5 seconds
  };

  // Navigate to the next screen
  const navigateToNextScreen = () => {
    navigation.navigate("Personalinfo"); // Replace 'Personalinfo' with your target screen
    setOtp(["", "", "", "", "", ""]); // Reset OTP after navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP For : {phoneNumber}</Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)} // Update OTP on change
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index); // Handle backspace functionality
              }
            }}
            ref={(ref) => (inputRefs.current[index] = ref)} // Assign ref to each input
            autoFocus={index === 0} // Focus the first input initially
          />
        ))}
      </View>

      {/* OTP Timer and Resend Button in One Line */}
      <View style={styles.timerResendContainer}>
        <Text style={styles.timerText}>
          {isTimerActive ? `OTP Valid for ${secondsRemaining}s` : "OTP Expired"}
        </Text>

        {/* Resend OTP Button (Only visible after 5 seconds) */}
        {canResend && (
          <TouchableOpacity
            onPress={handleResendOtp}
            style={styles.resendButton}
            disabled={!canResend} // Disable button while timer is running
          >
            <Text style={styles.resendButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  input: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    borderColor: "#ddd",
  },
  timerResendContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically in the center
    justifyContent: "space-between",
    width: "80%", // Adjust width to your liking
  },
  timerText: {
    fontSize: 16,
    color: "#555",
    marginRight: 10, // Space between timer and button
  },
  resendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "#007BFF", // Border color
  },
  resendButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
});

export default OTPScreen;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// {
  /* <OtpInput
numberOfDigits={6}
onChangeText={(text) => handleOtpChange(text)}
focusColor={'#7e57c2'}
theme={{
 pinCodeContainerStyle:{
          backgroundColor: 'white',
          width:50,
          height:50,
          borderRadius:12,
          borderWidth:2,
          borderColor:'light gray'
         
}
}}

/> */
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { OtpInput } from 'react-native-otp-entry';

// const OTPScreen = ({ route, navigation}) => {
//   // States for OTP, Timer, and Resend State
//   const [otp, setOtp] = useState(''); // OTP as a string
//   const [isTimerActive, setIsTimerActive] = useState(true);
//   const [secondsRemaining, setSecondsRemaining] = useState(59);
//   const [canResend, setCanResend] = useState(false); // Controls the Resend OTP button visibility
//   const [isOtpResent, setIsOtpResent] = useState(false); // To track if OTP has been resent
//   const { phoneNumber } = route.params;  // Get phone number from params
//   // const navigation = useNavigation(); // Hook to access navigation

//   useEffect(() => {
//     // Set up a timer that counts down from 59 seconds
//     if (isTimerActive) {
//       const timer = setInterval(() => {
//         setSecondsRemaining((prev) => {
//           if (prev === 0) {
//             clearInterval(timer);
//             setIsTimerActive(false); // Stop the timer once it reaches 0
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       // Cleanup the interval when the component is unmounted or timer ends
//       return () => clearInterval(timer);
//     }
//   }, [isTimerActive]);

//   useEffect(() => {
//     // Enable the Resend OTP button after 30 seconds
//     const resendTimer = setTimeout(() => {
//       setCanResend(true);
//     }, 30000); // 30 seconds delay for Resend OTP

//     // Cleanup the timeout on component unmount
//     return () => clearTimeout(resendTimer);
//   }, []);

//   // Handle OTP input change
//   const handleOtpChange = (text) => {
//     setOtp(text);

//     // Check if all OTP fields are filled and navigate automatically
//     if (otp.length === 6) {
//       navigateToNextScreen();

//     }
//   };

//   // Handle Resend OTP
//   const handleResendOtp = () => {
//     setOtp(''); // Clear OTP input
//     setSecondsRemaining(59);  // Reset timer
//     setIsTimerActive(true);    // Start the timer again
//     setCanResend(false);       // Disable Resend OTP button again
//     setIsOtpResent(true);      // Mark OTP as resent
//     setTimeout(() => setCanResend(true), 5000); // Reset resend after another 30 seconds
//   };

//   // Navigate to the next screen
//   const navigateToNextScreen = (navigation) => {
//     navigation.navigate('Personalinfo',{}); // Replace 'Personalinfo' with your target screen
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter OTP For: {phoneNumber}</Text>

//       {/* OTP Input Field using OtpInput */}
//       <View style={styles.otpContainer}>
//       <OtpInput
//         value={otp}
//         onChangeText={()=>{handleOtpChange}}
//         //  tintColor="#007BFF"
//         //  offTintColor="#ddd"
//         inputCount={6} // For 6 OTP digits
//         // secureTextEntry
//         focusColor={'#7e57c2'}
//         theme={{
//           pinCodeContainerStyle:{
//                    backgroundColor: 'white',
//                    width:50,
//                    height:50,
//                    borderRadius:12,
//                    borderWidth:2,
//          }
//          }}
//       />
//   </View>
//       {/* OTP Timer and Resend Button in One Line */}
//       <View style={styles.timerResendContainer}>
//         <Text style={styles.timerText}>
//           {isTimerActive ? `OTP Valid for ${secondsRemaining}s` : 'OTP Expired'}
//         </Text>

//         {/* Resend OTP Button (Only visible after 30 seconds) */}
//         {canResend && (
//           <TouchableOpacity
//             onPress={handleResendOtp}
//             style={styles.resendButton}
//             disabled={!canResend} // Disable button while timer is running
//           >
//             <Text style={styles.resendButtonText}>Resend OTP</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },

//   otpInput: {
//     width: 55,
//     height: 55,
//     borderWidth: 2,
//     borderRadius: 10,
//     textAlign: 'center',
//     fontSize: 22,
//     // borderColor: '#ddd',
//   },
//   otpContainer: {
//          flexDirection: 'row',
//          alignItems:'center',
//          justifyContent: 'space-between',
//          width: '80%',
//          marginBottom: 20,
//        },
//   timerResendContainer: {
//     flexDirection: 'row',
//     alignItems: 'center', // Align items vertically in the center
//     justifyContent: 'space-between',
//     width: '80%', // Adjust width to your liking
//   },

//   timerText: {
//     fontSize: 16,
//     color: '#555',
//     marginRight: 10, // Space between timer and button
//   },

//   resendButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     borderColor: '#007BFF', // Border color
//   },

//   resendButtonText: {
//     color: '#007BFF',
//     fontSize: 16,
//   },
// });

// export default OTPScreen;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
