import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../screens/app/profilePage";
import AppBottomTabStack from "./appBottomTabStack";
import { EditCredentialsPage, LoadingPage } from "../screens";
import { View, Text } from "react-native";

export type HomeStackParams = {
  Home: undefined;
  Profile: undefined;
  EditCredentials: undefined;
  Loading: undefined;
};
const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={AppBottomTabStack} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen
        name="EditCredentials"
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Edit Profile",
        }}
        component={EditCredentialsPage}
      />
      <Stack.Screen name="Loading" component={LoadingPage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
