import React, { FC, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { white, blue, grey } from "../../constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../constants/firebase";
import { StyledButton, StyledText, Tweet } from "../../components";
import { UserContext } from "../../navigation/mainNav";
import { Icon } from "@rneui/themed";
import { AppBottomTabStackParams } from "../../navigation/appBottomTabStack";

const HomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const navigationBottomStack =
    useNavigation<NativeStackNavigationProp<AppBottomTabStackParams>>();
  const user = useContext(UserContext).userInfo;

  const signOut = () => {
    auth.signOut();
  };

  const { width, height } = Dimensions.get("screen");

  return (
    <View style={styles.emptyContainer}>
      <View
        style={{
          alignSelf: "stretch",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
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
  emptyContainer: {
    flex: 1,
    padding: 40,
    flexDirection: "column",
    backgroundColor: white,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default HomePage;
