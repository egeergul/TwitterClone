import React, { FC, useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Icon } from "@rneui/themed";
import { StyledButton } from "../../components";
import { blue, lightgrey, white } from "../../constants/colors";
import { HomeStackParams } from "../../navigation/homeStack";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserContext } from "../../navigation/mainNav";
import ProgressCircle from "react-native-progress-circle";

const NewTweetPage: FC = () => {
  const user = useContext(UserContext).userInfo;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const [tweet, setTweet] = useState<string | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [percentageColor, setPercentageColor] = useState(blue);

  const close = () => {
    if (tweet == null || tweet?.length == 0) {
      navigation.goBack();
    } else {
      Alert.alert(
        "Post Tweet?",
        "If you go back, your changes will be deleted.",
        [
          {
            text: "Stay",
          },
          {
            text: "Go back",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/**   HEADER   */}
      <View style={styles.header}>
        <Icon type="ionicon" name="close" onPress={close} />
        <StyledButton
          padding={[7, 15, 7, 15]}
          title="Tweet"
          backgroundColor={blue}
          color={white}
          onPress={() => {}}
        />
      </View>

      {/** TWEET TEXT INPUT */}
      <ScrollView>
        <View style={styles.writeTweet}>
          <Image
            source={
              user.profilePicURL == "DEFAULT"
                ? require("../../../assets/imgs/account_man_filled.png")
                : { uri: user.profilePicURL }
            }
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
          />
          <TextInput
            multiline
            placeholder="Write your tweet here..."
            maxLength={280}
            style={{ flex: 1, fontSize: 20 }}
            onChangeText={(text) => {
              setTweet(text);
              setPercentage(tweet == null ? 0 : (tweet.length / 280) * 100);
              let color = blue;
              if (tweet != null && tweet.length > 224) {
                color = "red";
              }
              setPercentageColor(color);
            }}
          />
        </View>
      </ScrollView>

      {/**  BOTTOM TAB   */}
      <View style={styles.bottomTab}>
        <Icon type="ionicon" name="image-outline" color={blue} />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressCircle
            percent={percentage}
            radius={15}
            borderWidth={3}
            color={percentageColor}
            shadowColor="#999"
            bgColor="#fff"
          ></ProgressCircle>
          <Icon
            style={{ marginLeft: 20 }}
            type="antdesign"
            name="pluscircle"
            color={blue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewTweetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  writeTweet: {
    marginTop: 15,
    flexDirection: "row",
  },
  bottomTab: {
    paddingTop: 15,
    marginBottom: 15,
    borderTopColor: lightgrey,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
