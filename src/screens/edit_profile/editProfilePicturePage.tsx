import { View, StyleSheet, Image } from "react-native";
import { StyledButton, StyledText } from "../../components";
import { black, grey, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";

type Props = NativeStackScreenProps<RootStackParams, "EditProfilePicture">;

const EditProfilePicturePage = ({ route }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch" }}>
        <StyledText
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={28}
          text="Select a profile picture"
        />
        <View style={{ width: 1, height: 20 }}></View>
        <StyledText
          textAlign={"left"}
          text="Do you have a favorite selfie? Upload now!"
        />
      </View>

      <View style={{ alignSelf: "center" }}>
        <Icon
          size={50}
          type="ionicon"
          name="camera-outline"
          color={grey}
          reverse
          reverseColor={white}
          onPress={() => alert("Upload picture")}
        />
      </View>

      <StyledText text={route.params.user.uid}></StyledText>

      <StyledButton
        title="Skip for now"
        onPress={() => console.log("pressed")}
        backgroundColor={transparent}
        borderColor={black}
        color={black}
        alignSelf={"stretch"}
        margin={[0, 0, 40, 0]}
        borderWidth={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: white,
    padding: 40,
  },
});

export default EditProfilePicturePage;
