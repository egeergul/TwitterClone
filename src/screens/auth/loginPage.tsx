import React, { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StyledButton, StyledInput, StyledText } from "../../components";

import { black, blue, grey, transparent, white } from "../../constants/colors";

const LoginPage: FC = () => {
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

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
          onPress={() => alert("Signup")}
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
