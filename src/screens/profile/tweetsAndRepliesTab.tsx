import React, { FC } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { StyledText, Tweet } from "../../components";
import { grey, white } from "../../constants/colors";
import { TweetModel } from "../../models";

const { width, height } = Dimensions.get("screen");

// Required props
interface RequiredProps {
  tweets: TweetModel[];
  isMyProfile: boolean;
}
// Optional props
interface OptionalProps {
  username: string;
}
// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  username: "",
};

const TweetsAndRepliesTab = (props: Props) => {
  return (
    <View>
      {props.tweets.length == 0 ? (
        <View style={styles.emptyContainer}>
          <View
            style={{
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: width * 0.7, height: width * 0.7 }}
              source={require("../../../assets/imgs/no_replies.png")}
              resizeMode="contain"
            />
          </View>
          <StyledText
            text={
              props.isMyProfile
                ? "Create some Tweets"
                : props.username! + " hasn't Tweeted or replied to posts"
            }
            fontWeight={"bold"}
            fontSize={32}
          />
          <StyledText
            margin={[15, 0, 0, 0]}
            color={grey}
            text={
              props.isMyProfile
                ? "All of your Tweets and your replies to others' Tweets will be shown here."
                : "Once they do, those Tweets will show up here."
            }
          />
        </View>
      ) : (
        <View>
          {props.tweets.map((tweet) => {
            return <Tweet tweet={tweet} />;
          })}
          <View
            style={{
              flex: 1,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>.</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: white,
    padding: 40,

    height: height * 0.85,
  },
});

TweetsAndRepliesTab.defaultProps = defaultProps;
export default TweetsAndRepliesTab;
