import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ConfirmAndResetScreen from "../screens/ConfirmAndResetScreen";
import { localHost } from "../config";

function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [OTP, setOtp] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(true);

  // useEffect(() => {}, [verifyOtp]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${localHost}api/users/email-send`,
        {
          email,
        },
        config
      );
      console.log(`OTP has been send to the ${email}`);
      console.log(data);
      setVerifyOtp(false);
      alert("Please check your email for your one time password");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const resetSubmitHandler = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      console.log("Passwords doesnt match");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.put(
          `${localHost}api/users/change-password`,
          {
            email,
            OTP,
            password,
          },
          config
        );
        console.log(`Password has been reset for ${email}`);
        console.log(data);
        alert("Password has been updated");
        navigation.navigate("Login");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="lightblue"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      {verifyOtp ? (
        <SafeAreaView>
          <View>
            <View style={styles.loginContainer}>
              {/* <Text style={styles.label}>Email</Text> */}
              <TextInput
                style={styles.inputBox}
                placeholder="Email"
                onChangeText={(newText) => setEmail(newText)}
              />
              <TouchableOpacity onPress={submitHandler}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <KeyboardAwareScrollView>
          <View>
            <View style={styles.loginContainer}>
              {/* <Text style={styles.label}>OTP</Text> */}
              <TextInput
                style={styles.inputBox}
                placeholder="Enter your OTP"
                onChangeText={(newText) => setOtp(newText)}
              />
              {/* <Text>New Password</Text> */}
              <TextInput
                style={styles.inputBox}
                placeholder="New Password"
                secureTextEntry={true}
                onChangeText={(newText) => setPassword(newText)}
              />
              {/* <Text>Confirm Password</Text> */}
              <TextInput
                style={styles.inputBox}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={(newText) => setConfirmPassword(newText)}
              />
              <TouchableOpacity onPress={resetSubmitHandler}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    minHeight: "100%",
    backgroundColor: "white",
    minWidth: "80%",
    paddingVertical: "35%",
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    borderBottomWidth: 1,
    marginVertical: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "lightblue",
    marginTop: 20,
  },
  btnText: {
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    textAlign: "center",
  },
  registerText: {
    color: "lightblue",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
  },
});

export default ForgetPassword;
