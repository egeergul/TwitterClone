import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Animated,
  ImageBackground,
  RefreshControl,
  StatusBar,
  StyleSheet,
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
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { UserContext } from "../../navigation/mainNav";
import { ref, onValue, get, child, set, remove } from "firebase/database";
import { database, TWEETS } from "../../constants/firebase";
import { TweetModel, User } from "../../models";
import { getFormattedDate } from "../../helpers/helpers";
import TweetsTab from "../profile/tweetsTab";
import TweetsAndRepliesTab from "../profile/tweetsAndRepliesTab";
import LikesTab from "../profile/likesTab";
import MediaTab from "../profile/mediaTab";

const HEADER_HEIGHT_EXPANDED = 35;
const HEADER_HEIGHT_NARROWED = 100;
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

type Props = NativeStackScreenProps<HomeStackParams, "Profile">;
export default function WrappedApp({ route }: Props) {
  // Keeps notches away

  const [currentUser, setCurrentUser] = useState<User>(
    useContext(UserContext).userInfo
  );
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser.uid != route.params.uid) {
      get(child(ref(database), `users/${route.params.uid}`))
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();

            let newUser = new User(
              data.uid,
              data.name,
              data.username,
              data.email,
              data.isPublic,
              data.bio,
              data.profilePictureURL,
              data.profilePictureFilename,
              data.headerPicURL,
              data.headerPictureFilename,
              data.joinedAt
            );
            setCurrentUser(newUser);
            setIsMyProfile(false);
          }
        })
        .then(() => {
          get(
            child(
              ref(database),
              `follows/${route.params.uid}/followers/${currentUser.uid}`
            )
          ).then(async (snapshot) => {
            if (snapshot.exists()) {
              setIsFollowing(true);
            } else {
              setIsFollowing(false);
            }
          });
        });
    }
  }, []);

  return (
    <SafeAreaProvider>
      <App
        user={currentUser}
        isMyProfile={isMyProfile}
        isFollowing={isFollowing}
      />
    </SafeAreaProvider>
  );
}

interface UserProps {
  user: User;
  isMyProfile: boolean;
  isFollowing: boolean;
}
function App(props: UserProps) {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const user = props.user;
  const [tweets, setTweets] = useState<TweetModel[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [followings, setFollowings] = useState<string[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(props.isFollowing);
  const currentUser = useContext(UserContext).userInfo;

  const renderActiveTab = () => {
    if (activeTab == 0) {
      return (
        <TweetsTab
          isMyProfile={props.isMyProfile}
          tweets={tweets}
          username={user.username}
        />
      );
    } else if (activeTab == 1) {
      return (
        <TweetsAndRepliesTab
          isMyProfile={props.isMyProfile}
          tweets={tweets}
          username={user.username}
        />
      );
    } else if (activeTab == 2) {
      return (
        <MediaTab
          isMyProfile={props.isMyProfile}
          tweets={tweets.filter((tweet) => {
            return tweet.mediaURL != "DEFAULT";
          })}
          username={user.username}
        />
      );
    } else {
      return <LikesTab isMyProfile={props.isMyProfile} />;
    }
  };

  const fetchTweets = () => {
    const dbRef = ref(database, TWEETS + user.uid);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setTweets([]);
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
              data.mediaFilename,
              data.userProfilePicURL
            );

            setTweets((oldArray) => [tweet, ...oldArray]);
          }
        });
      }
    });
  };
  useEffect(() => {
    setTweets([]);
    fetchTweets();
  }, [user]);

  const fetchFollowers = () => {
    const dbRef = ref(database, `follows/${user.uid}/followers`);
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.exists()) {
              const key = childSnapshot.key;
              setFollowers((oldArray) => [key!, ...oldArray]);
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
    setFollowers([]);
    fetchFollowers();
  }, [isFollowing, user]);

  const fetchFollowings = () => {
    const dbRef = ref(database, `follows/${user.uid}/followings`);
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.exists()) {
              const key = childSnapshot.key;
              setFollowings((oldArray) => [key!, ...oldArray]);
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
    setFollowings([]);
    fetchFollowings();
  }, [isFollowing, user]);

  useEffect(() => {
    setIsFollowing(props.isFollowing);
  }, [props.isFollowing]);

  const follow = async () => {
    await set(
      ref(database, `follows/${user.uid}/followers/${currentUser.uid}`),
      {
        isFollowing: true,
      }
    );

    await set(
      ref(database, `follows/${currentUser.uid}/followings/${user.uid}`),
      {
        isFollowing: true,
      }
    );
    setIsFollowing(true);
  };

  const unfollow = async () => {
    await remove(
      ref(database, `follows/${user.uid}/followers/${currentUser.uid}`)
    );

    await remove(
      ref(database, `follows/${currentUser.uid}/followings/${user.uid}`)
    );
    setIsFollowing(false);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTweets();

    setRefreshing(false);
  }, []);
  return (
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
            text={user.name}
            color={white}
            fontSize={18}
            fontWeight="bold"
          />
          <StyledText
            text={tweets.length + " Tweets"}
            color={white}
            fontSize={12}
          />
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
          user.headerPicURL == "DEFAULT"
            ? require("../../../assets/imgs/default_header.jpg")
            : { uri: user.headerPicURL }
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
                user.profilePicURL == "DEFAULT"
                  ? require("../../../assets/imgs/account_man_filled.png")
                  : { uri: user.profilePicURL }
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

            {props.isMyProfile ? (
              <StyledButton
                alignSelf={"flex-end"}
                title="Edit Profile"
                backgroundColor={transparent}
                margin={[-35, -10, 0, 0]}
                color={black}
                padding={[5, 10, 5, 10]}
                borderColor={grey}
                borderWidth={1}
                onPress={() => navigation.navigate("EditCredentials")}
              />
            ) : (
              <StyledButton
                alignSelf={"flex-end"}
                title={isFollowing ? "Unfollow" : "Follow"}
                backgroundColor={black}
                margin={[-35, -10, 0, 0]}
                color={white}
                padding={[5, 25, 5, 25]}
                onPress={isFollowing ? unfollow : follow}
              />
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <StyledText
                  text={user.name}
                  fontWeight="bold"
                  fontSize={24}
                  margin={[0, 10, 0, 0]}
                />
                {user.isPublic ? <></> : <Icon name="locked" type="fontisto" />}
              </View>
            </View>

            <StyledText
              text={"@" + user.username}
              color={grey}
              margin={[0, 0, 0, 0]}
            />
            {user.bio ? (
              <StyledText text={user.bio} margin={[10, 0, 10, 0]} />
            ) : (
              <></>
            )}
            <StyledText
              text={"Joined " + getFormattedDate(user.joinedAt)}
              color={grey}
            />

            {/* Profile stats */}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  if (!props.isMyProfile && followings.length == 0) {
                  } else {
                    navigation.push("FollowInfo", {
                      source: "Following",
                      list: followings,
                    });
                  }
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <StyledText text={followings.length + ""} fontWeight="bold" />
                  <StyledText
                    margin={[0, 0, 0, 5]}
                    text="Following"
                    color={grey}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!props.isMyProfile && followers.length == 0) {
                  } else {
                    navigation.push("FollowInfo", {
                      source: "Followers",
                      list: followers,
                    });
                  }
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <StyledText
                    margin={[0, 0, 0, 10]}
                    text={followers.length + ""}
                    fontWeight="bold"
                  />
                  <StyledText
                    margin={[0, 0, 0, 5]}
                    text="Follower"
                    color={grey}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TabMenu
          tabs={["Tweets", "Tweets & replies", "Media", "Likes"]}
          setActiveTab={setActiveTab}
        />

        {renderActiveTab()}
      </Animated.ScrollView>
    </View>
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
