import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white } from "../../constants/colors";

const MentionsTab: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Mentions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white,
  },
});

export default MentionsTab;
