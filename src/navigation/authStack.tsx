import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  WelcomePage,
  SignUpPage,
  LoginPage,
  EditProfilePicturePage,
  EditHeaderPicturePage,
  EditBioPage,
} from "../screens";
import { Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type RootStackParams = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
  EditProfilePicture: {
    name: string;
    email: string;
    password: string;
  };
  EditHeaderPicture: {
    name: string;
    email: string;
    password: string;
    profilePic: string | null;
  };
  EditBio: {
    name: string;
    email: string;
    password: string;
    profilePic: string | null;
  };
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
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      <RootStack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Image
              style={{
                width: 36,
                height: 36,
              }}
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
      <RootStack.Screen
        name="EditProfilePicture"
        component={EditProfilePicturePage}
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
        name="EditHeaderPicture"
        component={EditHeaderPicturePage}
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
        name="EditBio"
        component={EditBioPage}
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
