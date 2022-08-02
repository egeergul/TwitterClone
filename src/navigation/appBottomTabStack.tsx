import React, { FC } from "react";
import {
  DirectMessagesPage,
  HomePage,
  NotificationsPage,
  SearchPage,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack, { HomeStackParams } from "./homeStack";
import { Icon } from "@rneui/themed";
import { Image, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackActions, useNavigation } from "@react-navigation/native";
import { StyledButton } from "../components";
import { auth } from "../constants/firebase";
import { black, transparent } from "../constants/colors";
import { NavigationContext } from "../../App";
import { AUTH_STACK } from "../constants/navigation";
import { UserContext } from "./mainNav";

export type AppBottomTabStackParams = {
  HomeTab: undefined;
  Search: undefined;
  Notifications: undefined;
  DirectMessages: undefined;
};
const TabStack = createBottomTabNavigator<AppBottomTabStackParams>();

const AppBottomTabStack: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const signOut = (setNavStack: (stack: string) => void) => {
    auth.signOut();
    navigation.dispatch(StackActions.popToTop());
    setNavStack(AUTH_STACK);
  };

  return (
    <UserContext.Consumer>
      {(userContext) => (
        <NavigationContext.Consumer>
          {(navigationContext) => (
            <TabStack.Navigator
              screenOptions={{
                headerShown: true,
                tabBarShowLabel: false,
                headerLeft: () => (
                  <View>
                    {userContext.userInfo.profilePicLink == "DEFAULT" ? (
                      <Icon
                        type="material-community"
                        name="account"
                        onPress={() => {
                          navigation.navigate("Profile");
                        }}
                        style={{ marginLeft: 10 }}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Profile");
                        }}
                      >
                        <Image
                          source={require("../../assets/imgs/pp_example.jpg")}
                          style={{
                            marginLeft: 10,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ),
              }}
            >
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
                        onPress={() => {
                          signOut(navigationContext.setNavStack);
                        }}
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

                  headerRight: () => (
                    <View style={{ marginRight: 10 }}>
                      <Icon type="ionicon" name="settings-outline" />
                    </View>
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
                  headerRight: () => (
                    <View style={{ marginRight: 10 }}>
                      <Icon type="ionicon" name="settings-outline" />
                    </View>
                  ),
                }}
              />
            </TabStack.Navigator>
          )}
        </NavigationContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default AppBottomTabStack;
