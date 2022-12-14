import React, { FC, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { white, blue, grey } from "../../constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from "../../constants/firebase";
import { StyledButton, StyledText, Tweet } from "../../components";
import { UserContext } from "../../navigation/mainNav";
import { Icon } from "@rneui/themed";
import { AppBottomTabStackParams } from "../../navigation/appBottomTabStack";
import { onValue, ref } from "firebase/database";
import { TweetModel } from "../../models";

const HomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const navigationBottomStack =
    useNavigation<NativeStackNavigationProp<AppBottomTabStackParams>>();
  const user = useContext(UserContext).userInfo;
  const { width, height } = Dimensions.get("screen");

  const timestamp = new Date().getTime();
  const mockData = new TweetModel(
    "key",
    "data.uid",
    "Ege Ergül",
    "egeergull",
    false,
    "Today I dont feel like doing anything, Lololo lololo. I just wanna lay in my bed...",
    timestamp + "",
    "DEFAULT",
    "DEFAULT",
    "DEFAULT"
  );

  const [tweets, setTweets] = useState<TweetModel[]>([mockData]);

  const fetchTweets = () => {
    const dbRef = ref(database, `follows/${user.uid}/followings`);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.exists()) {
            const key = childSnapshot.key;
            onValue(ref(database, `tweets/${key}`), (tweetSnapshot) => {
              if (tweetSnapshot.exists()) {
                tweetSnapshot.forEach((childTweetSnapshot) => {
                  if (childTweetSnapshot.exists()) {
                    const data = childTweetSnapshot.val();
                    const tweet = new TweetModel(
                      key!,
                      data.uid,
                      data.name,
                      data.username,
                      data.isPinned,
                      data.text,
                      data.timestamp,
                      data.mediaURL,
                      data.mediaFilename,
                      data.userProfilePicURL
                    );

                    console.log(tweet.toString());

                    setTweets((oldList) => [tweet, ...oldList]);
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    setTweets([]);
    fetchTweets();
  }, []);

  return (
    <View style={styles.emptyContainer}>
      {tweets.length == 0 ? (
        <View style={{ padding: 40 }}>
          <View
            style={{
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: width * 0.7, height: width * 0.7 }}
              source={require("../../../assets/imgs/no_tweets.png")}
              resizeMode="contain"
            />
          </View>
          <StyledText
            text="Welcome to Twitter!"
            fontWeight={"bold"}
            fontSize={32}
          />
          <StyledText
            margin={[15, 0, 0, 0]}
            color={grey}
            text="To see what's happening on the world, you need to follow people or topics first. Then, you will see all the new Tweets here."
          />

          <StyledButton
            title="Explore people"
            onPress={() => navigationBottomStack.navigate("Search")}
            color={white}
            alignSelf="flex-start"
            margin={[20, 0, 0, 0]}
            backgroundColor={blue}
          />
        </View>
      ) : (
        <ScrollView
          style={{ backgroundColor: white, width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {tweets.map((tweet) => {
            return (
              /**uid={tweet.uid}
                key={tweet.tweetId}
                name={tweet.name}
                username={tweet.username}
                text={tweet.text}
                mediaURL={tweet.mediaURL}
                isPinned={tweet.isPinned}
                profilePicURL={tweet.userProfilePicURL}
                timestamp={parseInt(tweet.timestamp)} */
              <Tweet tweet={tweet} />
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
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("NewTweet")}
        style={{
          zIndex: 1000,
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: blue,
          height: 50,
          width: 50,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#171717",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
      >
        <Icon name="plus" type="antdesign" color="white" size={26} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    backgroundColor: white,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default HomePage;
