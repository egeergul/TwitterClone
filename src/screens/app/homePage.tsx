import React, { FC, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { white, blue } from "../../constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../constants/firebase";
import { Tweet } from "../../components";
import { UserContext } from "../../navigation/mainNav";
import { Icon } from "@rneui/themed";

const HomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const user = useContext(UserContext).userInfo;

  const signOut = () => {
    auth.signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{user.toString()}</Text>
      </ScrollView>
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
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;
