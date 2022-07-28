import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomePage, SignUpPage, LoginPage } from "../screens";
import { Image } from "react-native";
import { Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type RootStackParams = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParams>();

const AuthStack: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
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
          headerLeft: () => (
            <Icon
              type="ionicon"
              name="chevron-back"
              onPress={() => navigation.goBack()}
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
          headerLeft: () => (
            <Icon
              type="ionicon"
              name="chevron-back"
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </RootStack.Navigator>
  );
};

export default AuthStack;
