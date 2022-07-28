import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomePage, SignUpPage } from "../screens";
import { View, Image } from "react-native";

export type RootStackParams = {
  Welcome: undefined;
  Signup: undefined;
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
      <RootStack.Screen name="Signup" component={SignUpPage} />
    </RootStack.Navigator>
  );
};

export default AuthStack;
