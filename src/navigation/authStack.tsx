import React, { FC, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomePage, SignUpPage, LoginPage } from "../screens";
import { Image } from "react-native";

export type RootStackParams = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParams>();

const AuthStack: FC = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: true,
      }}
    >
      <RootStack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Image
              style={{ width: 36, height: 36 }}
              source={require("../../assets/imgs/logo.png")}
              resizeMode="contain"
            />
          ),
        }}
      />
      <RootStack.Screen
        name="Signup"
        component={SignUpPage}
        options={{
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Image
              style={{ width: 36, height: 36 }}
              source={require("../../assets/imgs/logo.png")}
              resizeMode="contain"
            />
          ),
        }}
      />

      <RootStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Image
              style={{ width: 36, height: 36 }}
              source={require("../../assets/imgs/logo.png")}
              resizeMode="contain"
            />
          ),
        }}
      />
    </RootStack.Navigator>
  );
};

export default AuthStack;
