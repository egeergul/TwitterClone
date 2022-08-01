import React, { FC } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { white } from "../../constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../constants/firebase";
import { Tweet } from "../../components";

const HomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const signOut = () => {
    auth.signOut();
  };

  return (
    <ScrollView style={styles.container}>
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    backgroundColor: white,
  },
});

export default HomePage;
