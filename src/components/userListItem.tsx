import { View, Image, StyleSheet } from "react-native";
import { grey, white } from "../constants/colors";
import StyledText from "./styledText";
import ImageLoad from "react-native-img-placeholder";

interface Props {
  name: string;
  username: string;
  profilePicURL: string;
}
const UserListItem = ({ name, username, profilePicURL }: Props) => {
  return (
    <View style={styles.container}>
      <ImageLoad
        source={
          profilePicURL == "DEFAULT"
            ? require("../../assets/imgs/account_man_filled.png")
            : { uri: profilePicURL }
        }
        placeholderStyle={styles.profilePic}
        borderRadius={25}
        style={styles.profilePic}
      />
      <View style={{ marginLeft: 10 }}>
        <StyledText text={name} fontWeight={"bold"} />
        <StyledText text={"@" + username} color={grey} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    borerRadius: 25,
    width: 50,
    height: 50,
  },
});
export default UserListItem;
