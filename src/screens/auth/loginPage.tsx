import React, { FC, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { StyledButton, StyledInput, StyledText } from "../../components";

import { black, blue, grey, transparent, white } from "../../constants/colors";
import { auth } from "../../constants/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavigationContext } from "../../../App";
import { HOME_STACK } from "../../constants/navigation";
import { StackActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/authStack";
import { database } from "../../constants/firebase";
import { ref, get, child } from "firebase/database";
import { UserContext } from "../../navigation/mainNav";
import { User } from "../../models";

const LoginPage: FC = () => {
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const signin = async (
    setNavStack: (stack: string) => void,
    setUserInfo: any
  ) => {
    if (email === null) {
      Alert.alert("Email must be filled!");
    } else if (password === null) {
      Alert.alert("Password must be filled!");
    } else if (password.length < 6) {
      Alert.alert("Password must be at elast 6 characters long!");
    } else {
      navigation.navigate("Loading");
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          get(child(ref(database), `users/${user.uid}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                let newUser = new User(
                  data.name,
                  data.email,
                  data.bio,
                  data.profilePicture
                );
                setUserInfo(newUser);
                navigation.dispatch(StackActions.popToTop());
                setNavStack(HOME_STACK);
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
              const errorCode = error.code;
              const errorMessage = error.message;
              if (error.code === "auth/network-request-failed") {
                Alert.alert(
                  "Something went wrong! Please check your internet connection and try again."
                );
              } else {
                Alert.alert("Something went wrong!");
              }
              //
              navigation.goBack();
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            "Error in log in function with error code " +
              errorCode +
              " and error message " +
              errorMessage
          );
          if (error.code === "auth/network-request-failed") {
            Alert.alert(
              "Something went wrong! Please check your internet connection and try again."
            );
          } else if (error.code === "auth/user-not-found") {
            Alert.alert("No such user is found!");
          } else if (error.code === "auth/invalid-email") {
            Alert.alert("That email address is invalid!");
          } else if (errorCode === "auth/wrong-password") {
            Alert.alert(
              "Wrong credentials! Check your email address and password."
            );
          } else {
            Alert.alert("Something went wrong!");
          }
          navigation.goBack();
        });
    }
  };

  return (
    <UserContext.Consumer>
      {(userContext) => (
        <NavigationContext.Consumer>
          {(navigationContext) => (
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
                  onPress={() =>
                    signin(
                      navigationContext.setNavStack,
                      userContext.setUserInfo
                    )
                  }
                />
              </View>
            </View>
          )}
        </NavigationContext.Consumer>
      )}
    </UserContext.Consumer>
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
