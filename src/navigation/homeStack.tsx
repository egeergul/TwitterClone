import React, { FC } from "react";
import { HomePage } from "../screens";
import { Image, View } from "react-native";
import { Icon } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "../screens/app/profilePage";
import { StyledButton, StyledText } from "../components";
import { auth } from "../constants/firebase";
import { blue, black, transparent, white } from "../constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type HomeStackParams = {
  Home: undefined;
  Profile: undefined;
};
const Stack = createNativeStackNavigator<HomeStackParams>();

const signOut = () => {
  auth.signOut();
};

const HomeStack: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Home"
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
          headerLeft: () => (
            <Icon
              type="material-community"
              name="account"
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
          headerRight: () => (
            <StyledButton
              title="Log out"
              onPress={signOut}
              color={black}
              backgroundColor={transparent}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerShown: false,
          headerTintColor: white,
          headerLargeStyle: { backgroundColor: blue },
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <View style={{ flex: 1 }}>
              <StyledText color={white} fontWeight="bold" text="Boşun Sanatı" />
              <StyledText color={white} text="43 Tweets" />
            </View>
          ),

          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Icon color={white} type="ionicon" name="search" />
              <Icon
                color={white}
                type="ionicon"
                name="ellipsis-vertical"
                style={{ marginLeft: 20 }}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
