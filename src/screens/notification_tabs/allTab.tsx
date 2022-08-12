import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { StyledText } from "../../components";
import { blue, grey, white } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../navigation/homeStack";

const { width, height } = Dimensions.get("screen");

const AllTab: FC = () => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: width * 0.7, height: width * 0.7 }}
          source={require("../../../assets/imgs/no_notifications.png")}
          resizeMode="contain"
        />
      </View>

      <StyledText
        text="Join the conversation"
        fontWeight={"bold"}
        fontSize={32}
      />
      <StyledText
        margin={[15, 0, 0, 0]}
        color={grey}
        text="From Retweets to likes and whole lot more, this is where ll the action happens about your Tweets and followers. You'll like it here."
      />

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: white,
    padding: 40,
  },
  imageContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
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

export default AllTab;
