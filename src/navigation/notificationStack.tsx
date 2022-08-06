import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AllTab, MentionsTab } from "../screens";

export type NotificationStackParams = {
  All: undefined;
  Mentions: undefined;
};
const Stack = createMaterialTopTabNavigator<NotificationStackParams>();

const NotificationStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All" component={AllTab} />
      <Stack.Screen name="Mentions" component={MentionsTab} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
