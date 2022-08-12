import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import { white, blue, grey } from "../../constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../constants/firebase";
import { StyledButton, StyledText, Tweet } from "../../components";
import { UserContext } from "../../navigation/mainNav";
import { Icon } from "@rneui/themed";
import { AppBottomTabStackParams } from "../../navigation/appBottomTabStack";
import { child, get, onValue, ref } from "firebase/database";
import { TweetModel } from "../../models";

const HomePage = () => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const navigationBottomStack =
    useNavigation<NativeStackNavigationProp<AppBottomTabStackParams>>();
  const user = useContext(UserContext).userInfo;
  const { width, height } = Dimensions.get("screen");

  // Hooks
  const [tweets, setTweets] = useState<TweetModel[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setTweets([]);
    fetchTweets();
  }, []);

  // Functions
  const goToNewTweet = () => navigation.navigate("NewTweet");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTweets();
    setRefreshing(false);
  }, []);

  const fetchTweets = () => {
    const dbRef = ref(database, `follows/${user.uid}/followings`);

    onValue(dbRef, (snapshot) => {
      setTweets([]);
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.exists()) {
            const uid = childSnapshot.key;

            get(child(ref(database), `tweets/${uid}`)).then((tweetSnapshot) => {
              if (tweetSnapshot.exists()) {
                tweetSnapshot.forEach((childTweetSnapshot) => {
                  if (childTweetSnapshot.exists()) {
                    const tweetId = childTweetSnapshot.key;
                    const data = childTweetSnapshot.val();

                    const tweet = new TweetModel(
                      tweetId!,
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

  return (
    <View style={styles.emptyContainer}>
      {tweets.length == 0 ? (
        <View style={{ padding: 40 }}>
          <View style={styles.emptyImageContainer}>
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {tweets.map((tweet) => {
            return <Tweet key={tweet.tweetId} tweet={tweet} />;
          })}
          <View style={styles.bottomGap}>
            <Text>.</Text>
          </View>
        </ScrollView>
      )}

      <TouchableOpacity onPress={goToNewTweet} style={styles.newTweet}>
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
  emptyImageContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomGap: {
    flex: 1,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  newTweet: {
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
  },
});

export default HomePage;
