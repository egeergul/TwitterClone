import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { black, white, grey, transparent, blue } from "../../constants/colors";
import { StyledText, StyledButton, TabMenu, Tweet } from "../../components";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { UserContext } from "../../navigation/mainNav";
import { ref, onValue } from "firebase/database";
import { database, TWEETS } from "../../constants/firebase";
import { TweetModel } from "../../models";
import { getFormattedDate } from "../../helpers/helpers";

const HEADER_HEIGHT_EXPANDED = 35;
const HEADER_HEIGHT_NARROWED = 100;

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function WrappedApp() {
  // Keeps notches away
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}

function App() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const user = useContext(UserContext).userInfo;
  const [tweets, setTweets] = useState<TweetModel[]>([]);

  const fetchTweets = () => {
    const dbRef = ref(database, TWEETS + user.uid);
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.exists()) {
              const key = childSnapshot.key;
              const data = childSnapshot.val();
              const tweet = new TweetModel(
                key!,
                data.uid,
                data.name,
                data.username,
                data.isPinned,
                data.text,
                data.timestamp,
                data.mediaURL,
                data.mediaFilename
              );
              console.log(tweet.toString());

              setTweets((oldArray) => [tweet, ...oldArray]);
            }
          });
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    setTweets([]);
    fetchTweets();
  }, []);

  return (
    <UserContext.Consumer>
      {(userContext) => (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          {/* Back button */}

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              zIndex: 1000,
              position: "absolute",
              top: insets.top + 10,
              left: 20,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="chevron-back" type="ionicon" color="white" size={26} />
          </TouchableOpacity>

          {/* New Tweet button */}

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

          {/* Name + tweets count */}
          <Animated.View
            style={{
              zIndex: 2,
              position: "absolute",
              top: insets.top + 6,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: scrollY.interpolate({
                inputRange: [90, 110],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [90, 120],
                    outputRange: [30, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <View></View>
            <View>
              <StyledText
                text={userContext.userInfo.name}
                color={white}
                fontSize={18}
                fontWeight="bold"
              />
              <StyledText text="41 Tweets" color={white} fontSize={12} />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Icon color={white} type="ionicon" name="search" />
              <Icon
                color={white}
                type="ionicon"
                name="ellipsis-vertical"
                style={{ marginLeft: 20 }}
              />
            </View>
          </Animated.View>

          {/* Banner */}
          <AnimatedImageBackground
            source={
              userContext.userInfo.headerPicURL == "DEFAULT"
                ? require("../../../assets/imgs/default_header.jpg")
                : { uri: userContext.userInfo.headerPicURL }
            }
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [-200, 0],
                    outputRange: [5, 1],
                    extrapolateLeft: "extend",
                    extrapolateRight: "clamp",
                  }),
                },
              ],
            }}
          >
            <AnimatedBlurView
              tint="dark"
              intensity={96}
              style={{
                ...StyleSheet.absoluteFillObject,
                zIndex: 2,
                opacity: scrollY.interpolate({
                  inputRange: [-50, 0, 50, 100],
                  outputRange: [1, 0, 0, 1],
                }),
              }}
            />
          </AnimatedImageBackground>

          {/* Tweets/profile */}
          <Animated.ScrollView
            stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false}
            pagingEnabled
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: scrollY },
                  },
                },
              ],
              { useNativeDriver: false }
            )}
            style={{
              zIndex: 3,
              marginTop: HEADER_HEIGHT_NARROWED,
              paddingTop: scrollY.interpolate({
                inputRange: [0, HEADER_HEIGHT_EXPANDED],
                outputRange: [HEADER_HEIGHT_EXPANDED, 0],
                extrapolate: "clamp",
              }),
            }}
          >
            <View style={[styles.container, { backgroundColor: white }]}>
              <View
                style={[
                  styles.container,
                  {
                    paddingHorizontal: 20,
                  },
                ]}
              >
                <Animated.Image
                  source={
                    userContext.userInfo.profilePicURL == "DEFAULT"
                      ? require("../../../assets/imgs/account_man_filled.png")
                      : { uri: userContext.userInfo.profilePicURL }
                  }
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 40,
                    borderWidth: 4,
                    borderColor: white,
                    marginTop: -30,
                    transform: [
                      {
                        scale: scrollY.interpolate({
                          inputRange: [0, HEADER_HEIGHT_EXPANDED],
                          outputRange: [1, 0.6],
                          extrapolate: "clamp",
                        }),
                      },
                      {
                        translateY: scrollY.interpolate({
                          inputRange: [0, HEADER_HEIGHT_EXPANDED],
                          outputRange: [0, 16],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <StyledText
                      text={userContext.userInfo.name}
                      fontWeight="bold"
                      fontSize={24}
                      margin={[0, 10, 0, 0]}
                    />
                    {userContext.userInfo.isPublic ? (
                      <></>
                    ) : (
                      <Icon name="locked" type="fontisto" />
                    )}
                  </View>
                  <StyledButton
                    title="Edit Profile"
                    backgroundColor={transparent}
                    margin={[-35, 0, 0, 0]}
                    color={black}
                    padding={[5, 10, 5, 10]}
                    borderColor={grey}
                    borderWidth={1}
                    onPress={() => navigation.navigate("EditCredentials")}
                  />
                </View>

                <StyledText
                  text={"@" + userContext.userInfo.username}
                  color={grey}
                  margin={[0, 0, 0, 0]}
                />
                {userContext.userInfo.bio ? (
                  <StyledText
                    text={userContext.userInfo.bio}
                    margin={[10, 0, 10, 0]}
                  />
                ) : (
                  <></>
                )}
                <StyledText
                  text={"Joined " + getFormattedDate(user.joinedAt)}
                  color={grey}
                />

                {/* Profile stats */}
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <StyledText text="21" fontWeight="bold" />
                  <StyledText
                    margin={[0, 0, 0, 3]}
                    text="Following"
                    color={grey}
                  />
                  <StyledText
                    margin={[0, 0, 0, 10]}
                    text="12"
                    fontWeight="bold"
                  />
                  <StyledText
                    margin={[0, 0, 0, 3]}
                    text="Following"
                    color={grey}
                  />
                </View>
              </View>
            </View>

            <TabMenu
              tabs={["Tweets", "Tweets & replies", "Media", "Likes"]}
              setActiveTab={setActiveTab}
            />

            {tweets.map((tweet) => {
              return (
                <Tweet
                  name={tweet.name}
                  username={tweet.username}
                  text={tweet.text}
                  mediaURL={tweet.mediaURL}
                  isPinned={tweet.isPinned}
                  profilePicURL={user.profilePicURL}
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
          </Animated.ScrollView>
        </View>
      )}
    </UserContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  text: {
    color: black,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: -3,
  },
  tweetsCount: {
    fontSize: 13,
  },
  tweet: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255, 255, 255, 0.25)",
  },
});
