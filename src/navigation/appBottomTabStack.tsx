import React, { FC } from "react";

import { DirectMessagesPage, NotificationsPage, SearchPage } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "./homeStack";

const TabStack = createBottomTabNavigator();

const AppBottomTabStack: FC = () => {
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <TabStack.Screen name="HomeTab" component={HomeStack} />
      <TabStack.Screen name="Search" component={SearchPage} />
      <TabStack.Screen name="Notifications" component={NotificationsPage} />
      <TabStack.Screen name="DirectMessages" component={DirectMessagesPage} />
    </TabStack.Navigator>
  );
};

export default AppBottomTabStack;
