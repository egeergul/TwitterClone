import React, { FC } from "react";
import { HomePage } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../screens/app/profilePage";

export type HomeStackParams = {
  Home: undefined;
  Profile: undefined;
};
const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Profile" component={ProfilePage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
