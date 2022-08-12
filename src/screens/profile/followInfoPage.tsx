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
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { StyledText } from "../../components";
import { grey, lightgrey, white } from "../../constants/colors";
import { database } from "../../constants/firebase";
import { User } from "../../models";
import { AppBottomTabStackParams } from "../../navigation/appBottomTabStack";
import { HomeStackParams } from "../../navigation/homeStack";
import ImageLoad from "react-native-img-placeholder";

type Props = NativeStackScreenProps<HomeStackParams, "FollowInfo">;
const { width, height } = Dimensions.get("screen");

const FollowInfoPage = ({ route }: Props) => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const navigationBottomStack =
    useNavigation<NativeStackNavigationProp<AppBottomTabStackParams>>();

  // Hooks
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers([]);
    fetcUsers();
  }, []);

  // Functions
  const fetcUsers = () => {
    route.params.list.map((uid) => {
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
    <View style={{ backgroundColor: white, height: "100%" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((user) => {
          return (
            <TouchableOpacity
              key={user.uid}
              onPress={() => {
                navigation.push("Profile", {
                  uid: user.uid,
                });
              }}
            >
              <View style={styles.userContainer}>
                <ImageLoad
                  source={
                    user.profilePicURL == "DEFAULT"
                      ? require("../../../assets/imgs/account_man_filled.png")
                      : { uri: user.profilePicURL }
                  }
                  placeholderStyle={styles.profilePic}
                  borderRadius={25}
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
  userContainer: {
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
    backgroundColor: white,
  },
  profilePic: {
    borerRadius: 25,
    width: 50,
    height: 50,
  },
  line: {
    borderBottomColor: lightgrey,
    borderBottomWidth: 1,
  },
});

export default FollowInfoPage;
