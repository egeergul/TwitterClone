import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { StyledText, Tweet } from "../../components";
import { grey, white } from "../../constants/colors";
import { TweetModel } from "../../models";

const { width, height } = Dimensions.get("screen");

interface Props {
  tweets: TweetModel[];
  isMyProfile: boolean;
  username?: string;
}

const TweetsAndRepliesTab = ({ tweets, isMyProfile, username }: Props) => {
  return (
    <View>
      {tweets.length == 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../assets/imgs/no_replies.png")}
              resizeMode="contain"
            />
          </View>
          <StyledText
            text={
              isMyProfile
                ? "Create some Tweets"
                : username! + " hasn't Tweeted or replied to posts"
            }
            fontWeight={"bold"}
            fontSize={32}
          />
          <StyledText
            margin={[15, 0, 0, 0]}
            color={grey}
            text={
              isMyProfile
                ? "All of your Tweets and your replies to others' Tweets will be shown here."
                : "Once they do, those Tweets will show up here."
            }
          />
        </View>
      ) : (
        <View>
          {tweets.map((tweet) => {
            return <Tweet key={tweet.tweetId} tweet={tweet} />;
          })}
          <View style={styles.bottomGap}>
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
  imageContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: { width: width * 0.7, height: width * 0.7 },
  bottomGap: {
    flex: 1,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TweetsAndRepliesTab;
