import React, { FC, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { StyledButton, StyledInput, StyledText } from "../../components";
import { blue, white } from "../../constants/colors";

import auth from "@react-native-firebase/auth";

const SignupPage: FC = () => {
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  const signup = async () => {
    Alert.alert("PRESSED");
    await auth()
      .createUserWithEmailAndPassword(
        "jane.doe@example.com",
        "SuperSecretPassword!"
      )
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StyledText
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={28}
        text="Create your account"
      />

      <View style={{ alignSelf: "stretch" }}>
        <StyledInput
          placeholder="Name"
          maxLength={50}
          onChangeText={(text) => {
            setName(text);
          }}
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

      <StyledButton
        title="Sign Up"
        color={white}
        backgroundColor={blue}
        alignSelf="stretch"
        margin={[0, 0, 40, 0]}
        onPress={signup}
      />
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
});

export default SignupPage;
