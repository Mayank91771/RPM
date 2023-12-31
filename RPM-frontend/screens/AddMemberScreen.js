import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
  ScrollView,
} from "react-native";
import { TouchableOpacity, Checkbox } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { localHost } from "../config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";

function AddMemberScreen({ navigation }) {
  const loggedInAcademy = useSelector((state) => state.loggedInAcademy);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [beltColor, setBeltColor] = useState("");
  const [isSelected, setSelection] = useState(false);

  const submitHandler = async (e) => {
    console.log(new Date().getUTCDate());
    e.preventDefault();
    if (
      firstName == "" ||
      lastName == "" ||
      mobileNumber == "" ||
      email == "" ||
      beltColor == ""
    ) {
      alert("Please fill out all the fields.");
    }
    try {
      const { data } = await axios.post(`${localHost}api/users/create-member`, {
        firstName,
        lastName,
        mobileNumber,
        email,
        beltColor,
        loggedInAcademy,
      });
      navigation.navigate("MemberScreen");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate("MemberScreen")}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            minWidth: "90%",
            // backgroundColor: "red",
            marginVertical: 5,
          }}
        >
          <Ionicons
            name="close-outline"
            color="black"
            size={25}
            style={{ borderWidth: 1, borderColor: "black" }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        {/* <Text style={styles.heading}>ADD MEMBER</Text> */}

        <View style={styles.fields}>
          {/* <Text style={styles.label}>First Name</Text> */}
          <TextInput
            placeholder="First Name"
            style={styles.inputFields}
            onChangeText={(newText) => setFirstName(newText)}
          />
        </View>
        <View style={styles.fields}>
          {/* <Text style={styles.label}>Last Name</Text> */}
          <TextInput
            placeholder="Last Name"
            style={styles.inputFields}
            onChangeText={(newText) => setLastName(newText)}
          />
        </View>

        <View style={styles.fields}>
          {/* <Text style={[styles.label]}>Contact</Text> */}
          <TextInput
            placeholder="Contact"
            style={styles.inputFields}
            onChangeText={(newText) => setMobileNumber(newText)}
          />
        </View>

        <View style={styles.fields}>
          {/* <Text style={styles.label}>Email Id</Text> */}
          <TextInput
            placeholder="Email"
            style={styles.inputFields}
            onChangeText={(newText) => setEmail(newText)}
          />
        </View>

        <View style={styles.fields}>
          {/* <Text style={styles.label}>Belt</Text> */}
          <TextInput
            placeholder="Belt Rank"
            style={styles.inputFields}
            onChangeText={(newText) => setBeltColor(newText)}
          />
        </View>

        <TouchableOpacity onPress={submitHandler}>
          <Text style={styles.submitBtn}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    padding: 10,
    height: "92%",
    width: "95%",
    borderWidth: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 20,
    marginRight: 20,
    width: "30%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 30,
  },
  inputFields: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderRadius: 0,
    width: "100%",
    fontSize: 16,
  },
  fields: {
    flexDirection: "row",
    marginVertical: 20,
  },
  submitBtn: {
    padding: 10,
    paddingHorizontal: 30,
    minWidth: "90%",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "powderblue",
    color: "red",
    marginTop: 40,
    textAlign: "center",
    borderRadius: 20,
  },
});

export default AddMemberScreen;
