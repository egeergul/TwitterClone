import React, { FC } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { StyledText } from "../../components";
import { grey, white } from "../../constants/colors";

const { width, height } = Dimensions.get("screen");

const LikesTab: FC = () => {
  return (
    <View style={styles.container}>
      <StyledText text="Like some Tweets" fontWeight={"bold"} fontSize={32} />
      <StyledText
        margin={[15, 0, 0, 0]}
        color={grey}
        text="Tap to heart on any Tweet to show it some love. When you do it, it'll show up here."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: white,
    padding: 40,
    paddingTop: 100,
    height: height * 0.85,
  },
});
export default LikesTab;
