import React, { FC, useContext } from "react";
import { DirectMessagesPage, HomePage, SearchPage } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackParams } from "./homeStack";
import { Icon } from "@rneui/themed";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackActions, useNavigation } from "@react-navigation/native";
import { StyledButton } from "../components";
import { auth } from "../constants/firebase";
import { black, transparent } from "../constants/colors";
import { NavigationContext } from "../../App";
import { AUTH_STACK } from "../constants/navigation";
import { UserContext } from "./mainNav";
import NotificationStack from "./notificationStack";
import ImageLoad from "react-native-img-placeholder";

export type AppBottomTabStackParams = {
  HomeTab: undefined;
  Search: undefined;
  Notifications: undefined;
  DirectMessages: undefined;
};

const TabStack = createBottomTabNavigator<AppBottomTabStackParams>();

const AppBottomTabStack: FC = () => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const userContext = useContext(UserContext);
  const navigationContext = useContext(NavigationContext);

  // Functions
  const signOut = () => {
    auth.signOut();
    navigation.dispatch(StackActions.popToTop());
    navigationContext.setNavStack(AUTH_STACK);
  };

  const goToProfile = () => {
    navigation.navigate("Profile", {
      uid: userContext.userInfo.uid,
    });
  };

  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerLeft: () => (
          <TouchableOpacity onPress={goToProfile} style={{ marginLeft: 10 }}>
            <ImageLoad
              source={
                userContext.userInfo.profilePicURL == "DEFAULT"
                  ? require("../../assets/imgs/account_man_filled.png")
                  : { uri: userContext.userInfo.profilePicURL }
              }
              placeholderStyle={styles.profilePic}
              borderRadius={20}
              style={styles.profilePic}
            />
          </TouchableOpacity>
        ),
      }}
    >
      {/* Home Tab */}
      <TabStack.Screen
        name="HomeTab"
        component={HomePage}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <Image
              style={{ width: 36, height: 36 }}
              source={require("../../assets/imgs/logo.png")}
              resizeMode="contain"
            />
          ),

          headerRight: () => (
            <View>
              <StyledButton
                title="Log out"
                onPress={signOut}
                color={black}
                backgroundColor={transparent}
              />
            </View>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon type="ionicon" name="home" />
            ) : (
              <Icon type="ionicon" name="home-outline" />
            ),
        }}
      />

      {/* Search Tab */}
      <TabStack.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarIcon: ({}) => <Icon type="ionicon" name="search" />,
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Icon type="ionicon" name="settings-outline" />
            </View>
          ),
        }}
      />

      {/* Notifications Tab */}
      <TabStack.Screen
        name="Notifications"
        component={NotificationStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon type="ionicon" name="notifications" />
            ) : (
              <Icon type="ionicon" name="notifications-outline" />
            ),

          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Icon type="ionicon" name="settings-outline" />
            </View>
          ),
        }}
      />

      {/* Direct Messages Tab */}
      <TabStack.Screen
        name="DirectMessages"
        component={DirectMessagesPage}
        options={{
          headerTitle: "Direct Messages",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon type="material-community" name="email" />
            ) : (
              <Icon type="material-community" name="email-outline" />
            ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Icon type="ionicon" name="settings-outline" />
            </View>
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    borerRadius: 20,
    width: 40,
    height: 40,
  },
});

export default AppBottomTabStack;
