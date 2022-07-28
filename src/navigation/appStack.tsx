import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomePage } from "../screens";

const RootStack = createNativeStackNavigator();

const AppStack: FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="welcome" component={WelcomePage} />
    </RootStack.Navigator>
  );
};

export default AppStack;
