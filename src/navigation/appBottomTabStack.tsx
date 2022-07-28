import React, { FC } from "react";
import { DirectMessagesPage, NotificationsPage, SearchPage } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./homeStack";
import { Icon } from "@rneui/themed";

const TabStack = createBottomTabNavigator();

const AppBottomTabStack: FC = () => {
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <TabStack.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon type="ionicon" name="home" />
            ) : (
              <Icon type="ionicon" name="home-outline" />
            ),
        }}
      />

      <TabStack.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarIcon: ({}) => <Icon type="ionicon" name="search" />,
        }}
      />
      <TabStack.Screen
        name="Notifications"
        component={NotificationsPage}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon type="ionicon" name="notifications" />
            ) : (
              <Icon type="ionicon" name="notifications-outline" />
            ),
        }}
      />
      <TabStack.Screen
        name="DirectMessages"
        component={DirectMessagesPage}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon type="material-community" name="email" />
            ) : (
              <Icon type="material-community" name="email-outline" />
            ),
        }}
      />
    </TabStack.Navigator>
  );
};

export default AppBottomTabStack;
