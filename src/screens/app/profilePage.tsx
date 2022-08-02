import React, { useRef, useState } from "react";
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

function generateTweets(limit: number) {
  return new Array(limit).fill(0).map((_, index) => {
    const repetitions = Math.floor(Math.random() * 3) + 1;

    return {
      key: index.toString(),
      text: "Lorem ipsum dolor amet ".repeat(repetitions),
      author: "Arnaud",
      tag: "eveningkid",
    };
  });
}

const TWEETS = generateTweets(30);
const HEADER_HEIGHT_EXPANDED = 35;
const HEADER_HEIGHT_NARROWED = 100;

const PROFILE_BANNER_URI =
  "https://pbs.twimg.com/profile_banners/3296259169/1438473955/1500x500";

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

  const animateHeaderBackgroundColor = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: ["blue", "red"],
    extrapolateLeft: "extend",
    extrapolateRight: "clamp",
  });

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
            onPress={() => Alert.alert("Pressed")}
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
            source={require("../../../assets/imgs/header_example.jpg")}
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
                    userContext.userInfo.profilePicLink == "DEFAULT"
                      ? require("../../../assets/imgs/round-account-button-with-user-inside.png")
                      : require("../../../assets/imgs/pp_example.jpg")
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
                    {true ? (
                      <Icon name="locked" type="fontisto" />
                    ) : (
                      <Icon name="unlocked" type="fontisto" />
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
                    onPress={() => console.log("pressed")}
                  />
                </View>

                <StyledText
                  text="@BosunSanati"
                  color={grey}
                  margin={[0, 0, 0, 0]}
                />
                <StyledText
                  text={userContext.userInfo.bio}
                  margin={[10, 0, 10, 0]}
                />
                <StyledText
                  text="Born October 23, 2001   Joined July 2020"
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

            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
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

/** 
 * 
 * <View style={styles.container}>
          {TWEETS.map((item, index) => (
            <View key={item.key} style={styles.tweet}>
              <Image
                source={{
                  uri: PROFILE_PICTURE_URI,
                }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />

              <View style={styles.container}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontWeight: "bold",
                      fontSize: 15,
                    },
                  ]}
                >
                  {item.author}{" "}
                  <Text
                    style={{
                      color: "gray",
                      fontWeight: "normal",
                    }}
                  >
                    @{item.tag} · {index + 1}d
                  </Text>
                </Text>

                <Text style={[styles.text, { fontSize: 15 }]}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
 */
