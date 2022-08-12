import React from "react";
import { View, StyleSheet } from "react-native";
import { white } from "../../constants/colors";
import SearchPage from "./searchPage";
import HomePage from "./homePage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const NotificationsPage = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={SearchPage} />
        <Tab.Screen name="Settings" component={HomePage} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: white,
  },
});

export default NotificationsPage;
