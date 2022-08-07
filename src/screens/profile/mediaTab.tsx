import React, { FC } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { StyledText } from "../../components";
import { grey, white } from "../../constants/colors";

const { width, height } = Dimensions.get("screen");
const MediaTab: FC = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: "stretch",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: width * 0.7, height: width * 0.7 }}
          source={require("../../../assets/imgs/no_media.png")}
          resizeMode="contain"
        />
      </View>
      <StyledText
        text="Ligts, camera... attachments!"
        fontWeight={"bold"}
        fontSize={32}
      />
      <StyledText
        margin={[15, 0, 0, 0]}
        color={grey}
        text="Your photo and video Tweets will show up here."
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
    height: height * 0.85,
  },
});

export default MediaTab;
