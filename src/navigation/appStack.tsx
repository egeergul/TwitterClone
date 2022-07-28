import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Test } from "../screens";

const RootStack = createNativeStackNavigator();

const AppStack: FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <RootStack.Screen name="test" component={Test} />
    </RootStack.Navigator>
  );
};

export default AppStack;
