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
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signin, loggedInAcademy } from "../redux/actions";
import { localHost } from "../config";

let ScreenHeight = Dimensions.get("window").height;

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState("false");
  const [error, setError] = useState("");
  //
  const submitHandler = async (e) => {
    console.log("Loginn enter");
    e.preventDefault();
    if (name == "") {
      alert("Please enter academy name");
    } else if (email == "") {
      alert("Please enter email address");
    } else if (password == "") {
      alert("Please enter password");
    } else {
      try {
        const { data } = await axios.post(`${localHost}api/users/login`, {
          email,
          password,
          name,
        });
        console.log("Before async storage");
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        dispatch(signin());
        const userInfo = await AsyncStorage.getItem("userInfo");
        const parseUserInfo = JSON.parse(userInfo);
        dispatch(loggedInAcademy(parseUserInfo.name));
        console.log(`${email} Successfully logged in`);
      } catch (error) {
        alert(error.response.data.message);
        setEmail("");
        setName("");
        setPassword("");
      }
    }
  };

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  // const getAsyncStorageData = async () => {
  //   const userInfo = await AsyncStorage.getItem("userInfo");

  //   if (userInfo) {
  //     setIsSignedIn("true");
  //   } else {
  //     setIsSignedIn("false");
  //   }
  // };

  // useEffect(() => {
  //   const userInfo = AsyncStorage.getItem("userInfo");

  //   if (userInfo) {
  //     setIsSignedIn("true");
  //     // navigation.navigate("Dashboard");
  //     console.log("user signed in");
  //   } else {
  //     setIsSignedIn("false");
  //     console.log("user not signed in");
  //   }
  // }, [isSignedIn]);

  return (
    <View>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="lightblue"
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <SafeAreaView>
        <View>
          <View style={styles.loginContainer}>
            {/* <Text style={styles.label}>Academy Name</Text> */}
            <TextInput
              style={styles.inputBox}
              placeholder="Academy Name"
              value={name}
              onChangeText={(newText) => setName(newText)}
            />
            {/* <Text style={styles.label}>Email</Text> */}
            <TextInput
              style={styles.inputBox}
              placeholder="Email"
              value={email}
              onChangeText={(newText) => setEmail(newText)}
            />
            {/* <Text>Password</Text> */}
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(newText) => setPassword(newText)}
            />

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.btnText, { marginTop: 20 }]}>
                New user? {/* <TouchableOpacity> */}
                <Text style={styles.registerText}>register here.</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text style={[styles.btnText, { marginBottom: 20 }]}>
                Forget Password? {/* <TouchableOpacity> */}
                <Text style={styles.registerText}>click here.</Text>
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}> */}
            <TouchableOpacity onPress={submitHandler}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    minHeight: "100%",
    backgroundColor: "white",
    minWidth: "80%",
    paddingVertical: "35%",
    paddingHorizontal: 20,
    borderRadius: 20,
    // borderWidth: 1,
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
    color: "#72bcd4",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
  },
});

export default LoginScreen;
