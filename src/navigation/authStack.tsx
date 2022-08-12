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
        headerTitle: (props) => (
          <Image
            style={{ width: 36, height: 36 }}
            source={require("../../assets/imgs/logo.png")}
            resizeMode="contain"
          />
        ),
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerShadowVisible: false,
      }}
    >
      <RootStack.Screen name="Welcome" component={WelcomePage} />
      <RootStack.Screen name="Signup" component={SignUpPage} />
      <RootStack.Screen name="Login" component={LoginPage} />
      <RootStack.Screen name="EditUsername" component={EditUsername} />
      <RootStack.Screen name="EditBio" component={EditBioPage} />
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
      <RootStack.Screen
        name="EditProfilePicture"
        component={EditProfilePicturePage}
      />
      <RootStack.Screen
        name="EditHeaderPicture"
        component={EditHeaderPicturePage}
      />
    </RootStack.Navigator>
  );
};

export default AuthStack;
