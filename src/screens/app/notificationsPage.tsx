import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TabMenu } from "../../components";
import { white } from "../../constants/colors";

const NotificationsPage = () => {
  return (
    <View style={styles.container}>
      <TabMenu tabs={["All", "Mentions"]} setActiveTab={() => {}} />
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
    padding: 40,
    paddingTop: 0,
  },
});

export default NotificationsPage;
