import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white } from "../../constants/colors";

const SearchPage = () => {
  return (
    <View style={styles.container}>
      <Text>Search Page</Text>
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

export default SearchPage;
