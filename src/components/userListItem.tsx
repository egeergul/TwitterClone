import { FC } from "react";
import { Text, View, Image } from "react-native";
import { grey } from "../constants/colors";
import StyledText from "./styledText";

// Required props
interface RequiredProps {
  name: string;
  username: string;

  profilePicURL: string;
}
const UserListItem = (props: RequiredProps) => {
  return (
    <View
      style={{
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={
          props.profilePicURL == "DEFAULT"
            ? require("../../assets/imgs/account_man_filled.png")
            : { uri: props.profilePicURL }
        }
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      <View style={{ marginLeft: 10 }}>
        <StyledText text={props.name} fontWeight={"bold"} />
        <StyledText text={"@" + props.username} color={grey} />
      </View>
    </View>
  );
};

export default UserListItem;
