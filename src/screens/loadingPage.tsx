import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { StyledText } from "../components";
import { blue, white } from "../constants/colors";

const LoadingPage: FC = () => {
  return (
    <View style={styles.contaier}>
      <StyledText
        text="LOADING..."
        fontSize={46}
        fontWeight="bold"
        color={white}
      />
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blue,
  },
});
