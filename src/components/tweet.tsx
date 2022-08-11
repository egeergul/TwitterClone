import { Icon } from "@rneui/base";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
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
import ImageLoad from "react-native-img-placeholder";

const { height, width } = Dimensions.get("screen");

interface Props {
  tweet: TweetModel;
}

const Tweet = (props: Props) => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const uid = useContext(UserContext).userInfo.uid;

  // Hooks
  const [likedByViewer, setLikedByViewer] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [userProfilePictureURL, setUserProfilePictureURL] =
    useState<string>("DEFAULT");

  useEffect(() => {
    fetchProfilePicURL();
    fetchLikeCount();
    fetchLikedByViewer();
  }, []);

  // Functions
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
    setLikeCount(likeCount + 1);
    setLikedByViewer(true);
  };

  const unlikeTweet = async () => {
    await remove(
      ref(
        database,
        `tweets/${props.tweet.uid}/${props.tweet.tweetId}/likes/${uid}`
      )
    );
    setLikeCount(likeCount - 1);
    setLikedByViewer(false);
  };

  const fetchLikedByViewer = async () => {
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

  const fetchLikeCount = async () => {
    get(
      child(
        ref(database),
        `tweets/${props.tweet.uid}/${props.tweet.tweetId}/likes`
      )
    ).then(async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot;
        setLikeCount(data.size);
      } else {
        setLikeCount(0);
      }
    });
  };

  return (
    <TouchableOpacity onPress={goToTweet}>
      <View style={styles.container}>
        {/* PINNED */}
        {props.tweet.isPinned && (
          <View style={styles.pinned}>
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
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={goToProfile}>
            <ImageLoad
              source={
                userProfilePictureURL == "DEFAULT"
                  ? require("../../assets/imgs/account_man_filled.png")
                  : { uri: userProfilePictureURL }
              }
              style={styles.profilePic}
            />
          </Pressable>

          <View style={styles.bodyRight}>
            {/* USERNAME & DATE */}
            <View style={styles.usernameAndDate}>
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
                <Text>{getFormattedDate(parseInt(props.tweet.timestamp))}</Text>
                <Icon
                  color={grey}
                  type="ionicon"
                  size={16}
                  name="ellipsis-vertical"
                />
              </View>
            </View>

            {/* TWEET TEXT */}
            {props.tweet.text != "DEFAULT" && (
              <StyledText text={props.tweet.text} />
            )}

            {/* TWEET MEDIA */}
            {props.tweet.mediaURL != "DEFAULT" && (
              <View style={{ marginTop: 10 }}>
                <FullWidthImage
                  uriSource={props.tweet.mediaURL}
                  width={(width * 11) / 14}
                />
              </View>
            )}

            {/* ICONS */}
            <View style={styles.icons}>
              <Icon type="evilicon" name="comment" />
              <Icon type="evilicon" name="retweet" />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {likedByViewer ? (
                  <Icon
                    type="ionicon"
                    color="red"
                    name="heart"
                    onPress={unlikeTweet}
                  />
                ) : (
                  <Icon
                    type="ionicon"
                    name="heart-outline"
                    onPress={likeTweet}
                  />
                )}
                {likeCount != 0 && (
                  <StyledText
                    text={likeCount + ""}
                    color={grey}
                    margin={[0, 0, 0, 5]}
                  />
                )}
              </View>
              <Icon type="evilicon" name="share-google" />
              <Icon type="evilicon" name="chart" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Tweet;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderBottomColor: lightgrey,
    borderBottomWidth: 1,
  },
  pinned: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profilePic: {
    width: width / 7,
    height: width / 7,
    borderRadius: width / 14,
  },
  bodyRight: {
    marginLeft: 10,
    flexDirection: "column",
    width: (11 * width) / 14,
  },
  usernameAndDate: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10,
  },
});
