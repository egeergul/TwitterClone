import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { ref, remove, get, child, set } from "firebase/database";
import { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FullWidthImage, StyledText } from "../../components";
import { grey, lightgrey, white } from "../../constants/colors";
import { database } from "../../constants/firebase";
import { getFormatedDateWithHour } from "../../helpers/helpers";
import { HomeStackParams } from "../../navigation/homeStack";
import { UserContext } from "../../navigation/mainNav";
import ImageLoad from "react-native-img-placeholder";

type Props = NativeStackScreenProps<HomeStackParams, "TweetDetail">;
const { width, height } = Dimensions.get("screen");

const TweetDetailPage = ({ route }: Props) => {
  // Constants
  const uid = useContext(UserContext).userInfo.uid;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  // Hooks
  const [likedByViewer, setLikedByViewer] = useState<boolean>(false);
  const [likes, setLikes] = useState<string[]>([]);
  useEffect(() => {
    setLikes([]);
    fetchLikes();
    fetchLikedByViewer();
  }, []);

  // Functions
  const popAlert = () => {
    Alert.alert("Not implemented yet!");
  };

  const goToWhoLiked = () => {
    navigation.navigate("WhoLiked", {
      likedUIDs: likes,
    });
  };

  const likeTweet = async () => {
    await set(
      ref(
        database,
        `tweets/${route.params.tweet.uid}/${route.params.tweet.tweetId}/likes/${uid}`
      ),
      {
        liked: true,
      }
    );
    setLikes((oldList) => [...oldList, uid]);
    setLikedByViewer(true);
  };

  const unlikeTweet = async () => {
    await remove(
      ref(
        database,
        `tweets/${route.params.tweet.uid}/${route.params.tweet.tweetId}/likes/${uid}`
      )
    );
    setLikes(likes.filter((likedUsersId) => likedUsersId != uid));
    setLikedByViewer(false);
  };

  const fetchLikedByViewer = async () => {
    get(
      child(
        ref(database),
        `tweets/${route.params.tweet.uid}/${route.params.tweet.tweetId}/likes/${uid}`
      )
    ).then((snapshot) => {
      if (snapshot.exists()) {
        setLikedByViewer(true);
      } else {
        setLikedByViewer(false);
      }
    });
  };

  const fetchLikes = async () => {
    get(
      child(
        ref(database),
        `tweets/${route.params.tweet.uid}/${route.params.tweet.tweetId}/likes`
      )
    ).then(async (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((userSnapshot) => {
          if (userSnapshot.exists()) {
            const uid = userSnapshot.key;
            setLikes((oldList) => [uid!, ...oldList]);
          }
        });
      } else {
        setLikes([]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ alignSelf: "stretch", padding: 10 }}>
        {/**  Profile pic & Username  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ImageLoad
            source={
              route.params.tweet.userProfilePicURL == "DEFAULT"
                ? require("../../../assets/imgs/account_man_filled.png")
                : { uri: route.params.tweet.userProfilePicURL }
            }
            placeholderStyle={styles.profilePic}
            borderRadius={25}
            style={styles.profilePic}
          />
          <View style={styles.nameNusername}>
            <StyledText text={route.params.tweet.name} fontWeight="bold" />
            <StyledText text={"@" + route.params.tweet.username} color={grey} />
          </View>
        </View>

        {/**  Tweet Content */}
        <StyledText
          fontSize={22}
          text={route.params.tweet.text}
          margin={[10, 0, 10, 0]}
        />
        {route.params.tweet.mediaURL != "DEFAULT" && (
          <FullWidthImage
            width={width - 20}
            uriSource={route.params.tweet.mediaURL}
          />
        )}

        <StyledText
          text={getFormatedDateWithHour(parseInt(route.params.tweet.timestamp))}
          margin={[10, 0, 20, 0]}
          color={grey}
        />
        <View style={styles.line} />

        {/**  Tweet Activitiy */}
        <TouchableOpacity
          onPress={popAlert}
          style={{ flexDirection: "row", height: 40, alignItems: "center" }}
        >
          <Icon type="evilicon" name="chart" />
          <StyledText text="View Tweet activity" color={grey} />
        </TouchableOpacity>
        <View style={styles.line} />

        {/**  Likes */}
        {likes.length != 0 && (
          <>
            <Pressable onPress={goToWhoLiked}>
              <View style={styles.likes}>
                <StyledText
                  text={likes.length + ""}
                  fontWeight={"bold"}
                  margin={[0, 5, 0, 0]}
                />
                <StyledText text="Likes" color={grey} />
              </View>
            </Pressable>
            <View style={styles.line} />
          </>
        )}

        {/**  Icons */}
        <View style={styles.icons}>
          <Icon type="evilicon" name="comment" onPress={popAlert} />
          <Icon type="evilicon" name="retweet" onPress={popAlert} />
          {likedByViewer ? (
            <Icon
              type="ionicon"
              color="red"
              name="heart"
              onPress={unlikeTweet}
            />
          ) : (
            <Icon type="ionicon" name="heart-outline" onPress={likeTweet} />
          )}
          <Icon type="evilicon" name="share-google" onPress={popAlert} />
        </View>
        <View style={styles.line} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white,
  },
  profilePic: {
    borerRadius: 25,
    width: 50,
    height: 50,
  },
  nameNusername: {
    marginLeft: 10,
  },
  line: {
    borderBottomColor: lightgrey,
    borderBottomWidth: 1,
  },
  likes: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  icons: {
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default TweetDetailPage;
