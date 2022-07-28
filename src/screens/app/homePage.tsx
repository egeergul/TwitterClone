import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { white } from "../../constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button
        title="profile"
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
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
  },
});

export default HomePage;
