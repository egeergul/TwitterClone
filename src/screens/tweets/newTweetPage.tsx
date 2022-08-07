import React, { FC, useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { Icon } from "@rneui/themed";
import { FullWidthImage, StyledButton } from "../../components";
import { black, blue, grey, lightgrey, white } from "../../constants/colors";
import { HomeStackParams } from "../../navigation/homeStack";
import { StackActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserContext } from "../../navigation/mainNav";
import ProgressCircle from "react-native-progress-circle";
import * as ImagePicker from "expo-image-picker";
import { ref, set } from "firebase/database";
import { database, TWEETS, TWEET_MEDIA } from "../../constants/firebase";
import {
  generateUniqueID,
  getImageURL,
  uploadImage,
} from "../../constants/storageHelper";

const MAX_CHARCTERS = 280;
const { height, width } = Dimensions.get("screen");

const NewTweetPage: FC = () => {
  const user = useContext(UserContext).userInfo;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [tweet, setTweet] = useState<string | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [percentageColor, setPercentageColor] = useState(blue);

  const [media, setMedia] = useState<null | string>();

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase: 64,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setMedia(result.uri);
    }
  };

  const close = () => {
    if (tweet == null || tweet?.length == 0) {
      navigation.goBack();
    } else {
      Alert.alert(
        "Post Tweet?",
        "If you go back, your changes will be deleted.",
        [
          {
            text: "Stay",
          },
          {
            text: "Go back",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const postTweet = async () => {
    if (tweet || media) {
      navigation.navigate("Loading");

      let tweetText = "DEFAULT";
      if (tweet) {
        tweetText = tweet;
      }

      let tweetMediaFilename = "DEFAULT";
      let tweetMediaURL = "DEFAULT";

      if (media) {
        tweetMediaFilename = media;
        tweetMediaFilename = await uploadImage(
          TWEET_MEDIA + user.uid + "/",
          media
        );
        tweetMediaURL = await getImageURL(
          TWEET_MEDIA + user.uid + "/" + tweetMediaFilename
        );
      }

      const timestamp = new Date().getTime();
      const tweetUID = generateUniqueID();
      await set(ref(database, TWEETS + user.uid + "/" + tweetUID), {
        text: tweetText,
        timestamp: timestamp,
        uid: user.uid,
        mediaURL: tweetMediaURL,
        mediaFilename: tweetMediaFilename,
        isPinned: false,
        name: user.name,
        username: user.username,
      });
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate("Home");
    } else {
      Alert.alert("You have to type something first.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/**   HEADER   */}
      <View style={styles.header}>
        <Icon type="ionicon" name="close" onPress={close} />
        <StyledButton
          padding={[7, 15, 7, 15]}
          title="Tweet"
          backgroundColor={blue}
          color={white}
          onPress={postTweet}
        />
      </View>

      {/** TWEET TEXT INPUT */}
      <ScrollView>
        <View style={styles.writeTweet}>
          <Image
            source={
              user.profilePicURL == "DEFAULT"
                ? require("../../../assets/imgs/account_man_filled.png")
                : { uri: user.profilePicURL }
            }
            style={{
              width: width / 7 - 5,
              height: width / 7 - 5,
              borderRadius: width / 14,
              marginRight: 10,
              marginLeft: 10,
            }}
          />
          <View
            style={{
              width: (11 * width) / 14,
            }}
          >
            <TextInput
              multiline
              placeholder="What's happening?"
              maxLength={MAX_CHARCTERS}
              style={{ flex: 1, fontSize: 20 }}
              onChangeText={(text) => {
                setTweet(text);
                setPercentage(
                  tweet == null ? 0 : (tweet.length / MAX_CHARCTERS) * 100
                );
                let color = blue;
                if (tweet != null && tweet.length > MAX_CHARCTERS * 0.8) {
                  color = "red";
                }
                setPercentageColor(color);
              }}
            />

            {/** MEDIA SECTION */}
            {media ? (
              <View style={{ marginTop: 15 }}>
                <View style={{ position: "absolute", right: 0, zIndex: 100 }}>
                  <Icon
                    size={15}
                    type="ionicon"
                    name="close"
                    onPress={() => {
                      setMedia(null);
                    }}
                    color={black}
                    reverseColor={white}
                    reverse
                  />
                </View>

                <FullWidthImage
                  uriSource={media}
                  width={(width * 11) / 14}
                  borderRadius={15}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>

      {/**  BOTTOM TAB   */}
      <View style={styles.bottomTab}>
        <Icon
          type="ionicon"
          name="image-outline"
          color={blue}
          onPress={pickMedia}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressCircle
            percent={percentage}
            radius={15}
            borderWidth={3}
            color={percentageColor}
            shadowColor="#999"
            bgColor="#fff"
          >
            {tweet == null ? (
              <></>
            ) : tweet.length > MAX_CHARCTERS * 0.8 ? (
              <Text
                style={{ paddingLeft: 5, fontSize: 12, alignSelf: "center" }}
              >
                {MAX_CHARCTERS - tweet.length}{" "}
              </Text>
            ) : (
              <></>
            )}
          </ProgressCircle>
          <Icon
            style={{ marginLeft: 20 }}
            type="antdesign"
            name="pluscircle"
            color={blue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewTweetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  writeTweet: {
    marginTop: 15,
    flexDirection: "row",
  },
  bottomTab: {
    paddingTop: 15,
    margin: 15,
    borderTopColor: lightgrey,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
