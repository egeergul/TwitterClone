import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TabMenu } from "../../components";
import { white } from "../../constants/colors";
import SearchPage from "./searchPage";
import HomePage from "./homePage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
//  <TabMenu tabs={["All", "Mentions"]} setActiveTab={() => {}} />

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
