import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { StyledButton, StyledText } from "../../components";
import { blue, grey, white, transparent } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/authStack";

const WelcomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.container}>
      {/* This is a buffer view to make space-between spread evenly */}
      <View style={{ backgroundColor: transparent }}></View>
      <View>
        <StyledText
          text="See what's happening in the world right now."
          fontSize={36}
          fontWeight="bold"
          textAlign={"left"}
        />

        <StyledButton
          title="Create account"
          color={white}
          backgroundColor={blue}
          alignSelf="stretch"
          margin={[30, 0, 0, 0]}
          onPress={() => navigation.navigate("Signup")}
        />
      </View>

      <View style={{ flexDirection: "row", marginBottom: 50 }}>
        <StyledText text="Have an account already?" color={grey} />
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.navigate("Login")}
        >
          <StyledText text="Log in" color={blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: white,
    padding: 40,
  },
  logo: {
    marginTop: 10,
    width: 30,
    height: 30,
  },
});

export default WelcomePage;
