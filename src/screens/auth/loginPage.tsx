import React, { FC, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { StyledButton, StyledInput, StyledText } from "../../components";

import { black, blue, grey, transparent, white } from "../../constants/colors";
import { auth } from "../../constants/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage: FC = () => {
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  const signin = () => {
    if (email === null) {
      Alert.alert("Email must be filled!");
    } else if (password === null) {
      Alert.alert("Password must be filled!");
    } else if (password.length < 6) {
      Alert.alert("Password must be at elast 6 characters long!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            "Error in sign up function with error code " +
              errorCode +
              " and error message " +
              errorMessage
          );
          if (error.code === "auth/user-not-found") {
            Alert.alert("No such user is found!");
          } else if (error.code === "auth/invalid-email") {
            Alert.alert("That email address is invalid!");
          } else if (errorCode === "auth/wrong-password") {
            Alert.alert(
              "Wrong credentials! Check your email address and password."
            );
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch" }}>
        <StyledText
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={28}
          text="Enter your email and password"
        />
        <StyledInput
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <StyledInput
          placeholder="Password"
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton
          title="Forgot password?"
          color={black}
          backgroundColor={white}
          borderColor={grey}
          borderWidth={1}
          margin={[0, 0, 40, 0]}
          onPress={() => alert("Try to remember!")}
        />
        <StyledButton
          title="Log in"
          color={white}
          backgroundColor={black}
          margin={[0, 0, 40, 0]}
          onPress={signin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: white,
    padding: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
});

export default LoginPage;
