import { Icon, renderNode } from "@rneui/base";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FullWidthImage } from ".";
import { grey, lightgrey } from "../constants/colors";
import { getFormattedDate } from "../helpers/helpers";
import StyledText from "./styledText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../navigation/homeStack";
import { TweetModel } from "../models";
import { child, get, onValue, ref, remove, set } from "firebase/database";
import { database } from "../constants/firebase";
import { UserContext } from "../navigation/mainNav";

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
  const uid = useContext(UserContext).userInfo.uid;

  const likeTweet = async () => {
    await set(
      ref(
        database,
        `tweets/${props.tweet.uid}/${props.tweet.tweetId}/likes/${uid}`
      ),
      {
        liked: true,
      }
    );
    setLikedByViewer(true);
  };

  const unlikeTweet = async () => {
    await remove(
      ref(
        database,
        `tweets/${props.tweet.uid}/${props.tweet.tweetId}/likes/${uid}`
      )
    );
    setLikedByViewer(false);
  };

  const [likedByViewer, setLikedByViewer] = useState<boolean>(false);
  const fetchLikedByViewer = async () => {
    const dbRef = ref(database);

    get(
      child(
        ref(database),
        `tweets/${props.tweet.uid}/${props.tweet.tweetId}/likes/${uid}`
      )
    ).then((snapshot) => {
      if (snapshot.exists()) {
        setLikedByViewer(true);
      } else {
        setLikedByViewer(false);
      }
    });
  };

  useEffect(() => {
    fetchLikedByViewer();
  }, []);

  const [userProfilePictureURL, setUserProfilePictureURL] =
    useState<string>("DEFAULT");

  const fetchProfilePicURL = async () => {
    get(
      child(ref(database), `users/${props.tweet.uid}/profilePictureURL`)
    ).then(async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        setUserProfilePictureURL(data.userProfilePicURL);
      }
    });
  };

  useEffect(() => {
    fetchProfilePicURL();
  }, []);

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
        {props.tweet.isPinned && (
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
        )}
        {/* MAIN */}
        <View
          style={{
            flexDirection: "row",
            width: (11 * width) / 14,
          }}
        >
          <Pressable onPress={goToProfile}>
            <Image
              source={
                userProfilePictureURL == "DEFAULT"
                  ? require("../../assets/imgs/account_man_filled.png")
                  : { uri: userProfilePictureURL }
              }
              style={{
                width: width / 7,
                height: width / 7,
                borderRadius: width / 14,
              }}
            />
          </Pressable>

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
                <Pressable onPress={goToProfile}>
                  <StyledText text={props.tweet.name} fontWeight={"bold"} />
                </Pressable>
                <Pressable onPress={goToProfile}>
                  <StyledText
                    text={"@" + props.tweet.username}
                    color={grey}
                    margin={[0, 0, 0, 5]}
                  />
                </Pressable>
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
              {likedByViewer ? (
                <Icon type="ionicon" name="heart" onPress={unlikeTweet} />
              ) : (
                <Icon type="ionicon" name="heart-outline" onPress={likeTweet} />
              )}
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
