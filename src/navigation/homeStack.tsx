import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../screens/app/profilePage";
import AppBottomTabStack from "./appBottomTabStack";

export type HomeStackParams = {
  Home: undefined;
  Profile: undefined;
};
const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={AppBottomTabStack} />
      <Stack.Screen name="Profile" component={ProfilePage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
