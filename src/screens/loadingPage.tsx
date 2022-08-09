import { Icon } from "@rneui/base";
import React, { FC } from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { StyledText } from "../components";
import { blue, white } from "../constants/colors";

const LoadingPage: FC = () => {
  return (
    <View style={styles.contaier}>
      <Icon color={white} name="twitter" type="antdesign" size={40} />
      <View style={{ flexDirection: "column" }}>
        <ActivityIndicator
          color={white}
          size="large"
          style={{ marginBottom: 10 }}
        />
        <StyledText text="Loading..." fontWeight="bold" color={white} />
      </View>
      <View />
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: blue,
    padding: 75,
  },
});
