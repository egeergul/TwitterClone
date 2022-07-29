import React, { FC, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { StyledButton, StyledInput, StyledText } from "../../components";
import { blue, white } from "../../constants/colors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../constants/firebase";

const SignupPage: FC = () => {
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  const signup = () => {
    if (name === null) {
      Alert.alert("Name field must be filled!");
    } else if (email === null) {
      Alert.alert("Email must be filled!");
    } else if (password === null) {
      Alert.alert("Password must be filled!");
    } else if (password.length < 6) {
      Alert.alert("Password must be at elast 6 characters long!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          set(ref(database, "users/" + user.uid), {
            name: name,
            email: email,
            password: password,
          })
            .then(() => {
              console.log(
                "User with uid " +
                  user.uid +
                  " has been saved both to auth and real-time db"
              );
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
            });
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
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("That email address is already in use!");
          } else if (error.code === "auth/invalid-email") {
            Alert.alert("That email address is invalid!");
          } else {
            Alert.alert("Something went wrong!");
          }
        });
    }
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
