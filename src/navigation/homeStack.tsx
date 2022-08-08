import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppBottomTabStack from "./appBottomTabStack";
import {
  EditCredentialsPage,
  LoadingPage,
  NewTweetPage,
  ProfilePage,
  FollowInfoPage,
} from "../screens";
import { View, Text } from "react-native";

export type HomeStackParams = {
  Home: undefined;
  Profile: {
    uid: string;
  };
  FollowInfo: {
    source: string;
    list: string[];
  };
  EditCredentials: undefined;
  NewTweet: undefined;
  Loading: undefined;
};
const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={AppBottomTabStack} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen
        name="FollowInfo"
        component={FollowInfoPage}
        options={({ route }) => ({
          title: route.params.source,
          headerShown: true,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="EditCredentials"
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "Edit Profile",
        }}
        component={EditCredentialsPage}
      />
      <Stack.Screen name="NewTweet" component={NewTweetPage} />
      <Stack.Screen name="Loading" component={LoadingPage} />
    </Stack.Navigator>
  );
};

export default HomeStack;
