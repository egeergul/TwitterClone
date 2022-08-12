import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { child, get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { StyledText } from "../../components";
import { grey, white, lightgrey } from "../../constants/colors";
import { database } from "../../constants/firebase";
import { User } from "../../models";
import { HomeStackParams } from "../../navigation/homeStack";
import ImageLoad from "react-native-img-placeholder";

type Props = NativeStackScreenProps<HomeStackParams, "WhoLiked">;

const { width, height } = Dimensions.get("screen");

const WhoLikedPage = ({ route }: Props) => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  // Hooks
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers([]);
    fetcUsers();
  }, []);

  // Functions
  const fetcUsers = () => {
    route.params.likedUIDs.map((uid) => {
      get(child(ref(database), `users/${uid}`)).then(async (snapshot) => {
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
          setUsers((oldUsers) => [newUser, ...oldUsers]);
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((user) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.push("Profile", {
                  uid: user.uid,
                });
              }}
            >
              <View style={styles.userItem}>
                <ImageLoad
                  source={
                    user.profilePicURL == "DEFAULT"
                      ? require("../../../assets/imgs/account_man_filled.png")
                      : { uri: user.profilePicURL }
                  }
                  placeholderStyle={styles.profilePic}
                  borderRadius={30}
                  style={styles.profilePic}
                />

                <View style={{ marginLeft: 10 }}>
                  <StyledText text={user.name} fontWeight="bold" />
                  <StyledText text={"@" + user.username} color={grey} />
                  <View style={{ width: width * 0.75 }}>
                    <Text style={{ fontSize: 14, width: width * 0.75 }}>
                      {user.bio.length > 80
                        ? user.bio.substring(0, 79) + "..."
                        : user.bio}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.line} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: white, height: "100%" },
  userItem: {
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
  },
  profilePic: {
    borerRadius: 30,
    width: 60,
    height: 60,
  },
  line: {
    borderBottomColor: lightgrey,
    borderBottomWidth: 1,
  },
});
export default WhoLikedPage;
