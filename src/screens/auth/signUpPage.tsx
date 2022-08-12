import { FC, useState } from "react";
import { StyleSheet, Alert, View } from "react-native";
import { white } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/authStack";
import { StyledButton, StyledInput, StyledText } from "../../components";
import { black, transparent } from "../../constants/colors";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../constants/firebase";

const SignupPage: FC = () => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // Hooks
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  // Fuctions
  const checkEmail = async (email: string): Promise<boolean> => {
    var result: boolean = false;
    await fetchSignInMethodsForEmail(auth, email)
      .then((arr) => {
        if (arr.length != 0) {
          Alert.alert("That email address is already in use!");
          result = false;
        } else {
          result = true;
        }
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
        if (error.code === "auth/network-request-failed") {
          Alert.alert(
            "Something went wrong! Please check your internet connection and try again."
          );
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        } else {
          Alert.alert("Something went wrong!");
        }
        result = false;
      });
    return result;
  };

  const signup = async () => {
    if (name === null) {
      Alert.alert("Name field must be filled!");
    } else if (email === null) {
      Alert.alert("Email must be filled!");
    } else if (password === null) {
      Alert.alert("Password must be filled!");
    } else if (password.length < 6) {
      Alert.alert("Password must be at elast 6 characters long!");
    } else if (await checkEmail(email)) {
      navigation.navigate("EditUsername", {
        name,
        email,
        password,
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
        title="Next"
        color={black}
        backgroundColor={transparent}
        borderColor={black}
        borderWidth={1}
        padding={[5, 15, 5, 15]}
        alignSelf="flex-end"
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
