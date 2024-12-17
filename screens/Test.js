import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Use this for navigation
const Test = ({ route }) => {
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
export default Test;
