import React, { FC } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { StyledText } from "../../components";
import { grey, white } from "../../constants/colors";
import { TweetModel } from "../../models";

const { width, height } = Dimensions.get("screen");

// Required props
interface RequiredProps {
  isMyProfile: boolean;
}
// Optional props
interface OptionalProps {}
// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {};

const LikesTab = (props: RequiredProps) => {
  return (
    <View style={styles.container}>
      {props.isMyProfile ? (
        <View>
          <StyledText
            text="Like some Tweets"
            fontWeight={"bold"}
            fontSize={32}
          />
          <StyledText
            margin={[15, 0, 0, 0]}
            color={grey}
            text="Tap to heart on any Tweet to show it some love. When you do it, it'll show up here."
          />
        </View>
      ) : (
        <></>
      )}
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

LikesTab.defaultProps = defaultProps;
export default LikesTab;
