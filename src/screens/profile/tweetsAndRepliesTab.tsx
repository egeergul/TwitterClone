import React, { FC } from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { StyledText, Tweet } from "../../components";
import { grey, white } from "../../constants/colors";
import { TweetModel } from "../../models";

const { width, height } = Dimensions.get("screen");

// Required props
interface RequiredProps {
  tweets: TweetModel[];
}
// Optional props
interface OptionalProps {}
// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {};

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
            text="Create some Tweets"
            fontWeight={"bold"}
            fontSize={32}
          />
          <StyledText
            margin={[15, 0, 0, 0]}
            color={grey}
            text="All of your Tweets and your replies to others' Tweets will be shown here."
          />
        </View>
      ) : (
        <View>
          {props.tweets.map((tweet) => {
            return (
              <Tweet
                key={tweet.tweetId}
                name={tweet.name}
                username={tweet.username}
                text={tweet.text}
                mediaURL={tweet.mediaURL}
                isPinned={tweet.isPinned}
                profilePicURL={tweet.userProfilePicURL}
                timestamp={parseInt(tweet.timestamp)}
              />
            );
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

export default TweetsAndRepliesTab;
