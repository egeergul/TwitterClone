import { Icon } from "@rneui/base";
import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FullWidthImage } from ".";
import { grey, lightgrey } from "../constants/colors";
import { getFormattedDate } from "../helpers/helpers";
import StyledText from "./styledText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../navigation/homeStack";
import { TweetModel } from "../models";

/**uid: string;
  name: string;
  username: string;
  text: string;
  mediaURL: string;
  isPinned: boolean;
  profilePicURL: string;
  timestamp: number; */
// Required props
interface RequiredProps {
  tweet: TweetModel;
}

// Optional props
interface OptionalProps {}
// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {};

const { height, width } = Dimensions.get("screen");

const Tweet = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const goToProfile = () => {
    navigation.push("Profile", {
      uid: props.tweet.uid,
    });
  };

  const goToTweet = () => {
    navigation.navigate("TweetDetail", {
      tweet: props.tweet,
    });
  };
  return (
    <TouchableOpacity onPress={goToTweet}>
      <View
        style={{
          margin: 10,
          borderBottomColor: lightgrey,
          borderBottomWidth: 1,
        }}
      >
        {/* PINNED */}
        {props.tweet.isPinned ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="pin"
              type="material-community"
              color={grey}
              size={14}
              style={{ alignSelf: "flex-start", marginStart: width / 7 - 5 }}
            />
            <StyledText
              text="Pinned Tweet"
              color={grey}
              fontWeight="bold"
              fontSize={14}
            />
          </View>
        ) : (
          <></>
        )}
        {/* MAIN */}
        <View
          style={{
            flexDirection: "row",
            width: (11 * width) / 14,
          }}
        >
          <TouchableOpacity onPress={goToProfile}>
            <Image
              source={
                props.tweet.userProfilePicURL == "DEFAULT"
                  ? require("../../assets/imgs/account_man_filled.png")
                  : { uri: props.tweet.userProfilePicURL }
              }
              style={{
                width: width / 7,
                height: width / 7,
                borderRadius: width / 14,
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              marginLeft: 10,
              flexDirection: "column",
              width: (11 * width) / 14,
            }}
          >
            {/* USERNAME & DATE */}
            <View
              style={{
                marginBottom: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={goToProfile}>
                  <StyledText text={props.tweet.name} fontWeight={"bold"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToProfile}>
                  <StyledText
                    text={"@" + props.tweet.username}
                    color={grey}
                    margin={[0, 0, 0, 5]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>
                  {" "}
                  {getFormattedDate(parseInt(props.tweet.timestamp))}{" "}
                </Text>
                <Icon
                  color={grey}
                  type="ionicon"
                  size={16}
                  name="ellipsis-vertical"
                />
              </View>
            </View>

            {/* TWEET TEXT */}
            {props.tweet.text == "DEFAULT" ? (
              <></>
            ) : (
              <StyledText text={props.tweet.text} />
            )}

            {/* TWEET MEDIA */}
            {props.tweet.mediaURL == "DEFAULT" ? (
              <></>
            ) : (
              <View style={{ marginTop: 10 }}>
                <FullWidthImage
                  uriSource={props.tweet.mediaURL}
                  width={(width * 11) / 14}
                  borderRadius={15}
                />
              </View>
            )}

            {/* ICONS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              <Icon type="evilicon" name="comment" />
              <Icon type="evilicon" name="retweet" />
              <Icon type="ionicon" name="heart-outline" />
              <Icon type="evilicon" name="share-google" />
              <Icon type="evilicon" name="chart" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Tweet.defaultProps = defaultProps;
export default Tweet;

const styles = StyleSheet.create({
  container: {},
});
