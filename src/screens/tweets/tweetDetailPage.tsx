import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { FullWidthImage, StyledText } from "../../components";
import { grey, lightgrey, white } from "../../constants/colors";
import { getFormatedDateWithHour } from "../../helpers/helpers";
import { HomeStackParams } from "../../navigation/homeStack";

type Props = NativeStackScreenProps<HomeStackParams, "TweetDetail">;
const { width, height } = Dimensions.get("screen");
const TweetDetailPage = ({ route }: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={
              route.params.tweet.userProfilePicURL == "DEFAULT"
                ? require("../../../assets/imgs/account_man_filled.png")
                : { uri: route.params.tweet.userProfilePicURL }
            }
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />

          <View>
            <StyledText text={route.params.tweet.name} fontWeight="bold" />
            <StyledText text={"@" + route.params.tweet.username} color={grey} />
          </View>
        </View>

        <StyledText
          fontSize={22}
          text={route.params.tweet.text}
          margin={[10, 0, 10, 0]}
        />
        {route.params.tweet.mediaURL == "DEFAULT" ? (
          <></>
        ) : (
          <FullWidthImage
            width={width - 20}
            uriSource={route.params.tweet.mediaURL}
          />
        )}

        <StyledText
          text={getFormatedDateWithHour(parseInt(route.params.tweet.timestamp))}
          margin={[10, 0, 0, 0]}
          color={grey}
        />
        <View
          style={{
            marginTop: 20,
            borderBottomColor: lightgrey,
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{ flexDirection: "row", height: 40, alignItems: "center" }}
        >
          <Icon type="evilicon" name="chart" />
          <StyledText text="View Tweet activity" color={grey} />
        </View>
        <View
          style={{
            borderBottomColor: lightgrey,
            borderBottomWidth: 1,
          }}
        />
        <View
          style={{ flexDirection: "row", height: 40, alignItems: "center" }}
        >
          <StyledText text="0" fontWeight={"bold"} margin={[0, 5, 0, 0]} />
          <StyledText text="Likes" color={grey} />
        </View>
        <View
          style={{
            borderBottomColor: lightgrey,
            borderBottomWidth: 1,
          }}
        />

        <View
          style={{
            height: 40,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Icon type="evilicon" name="comment" />
          <Icon type="evilicon" name="retweet" />
          <Icon type="ionicon" name="heart-outline" />
          <Icon type="evilicon" name="share-google" />
        </View>
        <View
          style={{
            borderBottomColor: lightgrey,
            borderBottomWidth: 1,
          }}
        />
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
});

export default TweetDetailPage;
