import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  WelcomePage,
  SignUpPage,
  LoginPage,
  LoadingPage,
  EditProfilePicturePage,
  EditHeaderPicturePage,
  EditBioPage,
  EditProfileCompletedPage,
  EditUsername,
} from "../screens";
import { Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type RootStackParams = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
  EditUsername: {
    name: string;
    email: string;
    password: string;
  };
  EditProfilePicture: {
    name: string;
    username: string;
    email: string;
    password: string;
  };
  EditHeaderPicture: {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePic: string | null;
  };
  EditBio: {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePic: string | null;
    headerPic: string | null;
  };
  Loading: undefined;
  Completed: undefined;
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
        name="EditUsername"
        component={EditUsername}
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
      <RootStack.Screen
        name="Loading"
        component={LoadingPage}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Completed"
        component={EditProfileCompletedPage}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default AuthStack;
