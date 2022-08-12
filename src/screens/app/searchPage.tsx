import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { blue, white } from "../../constants/colors";
import { UserContext } from "../../navigation/mainNav";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { ref, onValue } from "firebase/database";
import { database, USERS } from "../../constants/firebase";
import { User } from "../../models";
import { UserListItem } from "../../components";

const SearchPage = () => {
  // Constants
  const currentUser = useContext(UserContext).userInfo;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  // Hooks
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    setUsers([]);
    fetchUsers();
  }, []);

  // Functions
  const fetchUsers = () => {
    const dbRef = ref(database, USERS);
    setUsers([]);
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.exists()) {
              const data = childSnapshot.val();
              let user = new User(
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
              setUsers((oldArray) => [user, ...oldArray]);
            }
          });
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map((user) => {
          if (currentUser.uid != user.uid) {
            return (
              <TouchableOpacity
                style={{ alignSelf: "stretch" }}
                onPress={() => {
                  navigation.navigate("Profile", {
                    uid: user.uid,
                  });
                }}
              >
                <View
                  style={{
                    marginTop: 18,
                    alignSelf: "stretch",
                  }}
                >
                  <UserListItem
                    name={user.name}
                    username={user.username}
                    profilePicURL={user.profilePicURL}
                  />
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("NewTweet")}
        style={styles.newTweet}
      >
        <Icon name="plus" type="antdesign" color="white" size={26} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 40,
    paddingTop: 20,
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

export default SearchPage;
