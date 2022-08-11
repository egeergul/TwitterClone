import { StackActions, useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { child, get, ref } from "firebase/database";
import { useSafeArea } from "native-base";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";

import { StyledButton, StyledText } from "../../components";
import { grey, white, blue } from "../../constants/colors";
import { database } from "../../constants/firebase";
import { HOME_STACK } from "../../constants/navigation";
import { User } from "../../models";
import user from "../../models/user";
import { AppBottomTabStackParams } from "../../navigation/appBottomTabStack";
import { RootStackParams } from "../../navigation/authStack";
import { HomeStackParams } from "../../navigation/homeStack";

type Props = NativeStackScreenProps<HomeStackParams, "FollowInfo">;
const { width, height } = Dimensions.get("screen");

const FollowInfoPage = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const navigationBottomStack =
    useNavigation<NativeStackNavigationProp<AppBottomTabStackParams>>();

  const [users, setUsers] = useState<User[]>([]);

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

  useEffect(() => {
    fetcUsers();
  }, []);

  return (
    <View>
      <View style={{ backgroundColor: white, height: "100%" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 20,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={
                      user.profilePicURL == "DEFAULT"
                        ? require("../../../assets/imgs/account_man_filled.png")
                        : { uri: user.profilePicURL }
                    }
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      marginLeft: 10,
                    }}
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
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default FollowInfoPage;
