import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { StyledButton, StyledText } from "../../components";
import { black, grey, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<RootStackParams, "EditProfilePicture">;

const EditProfilePicturePage = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [profilePic, setProfilePic] = useState<null | string>(null);

  const pickProfilePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase: 64,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };

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
        {profilePic ? (
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              source={{ uri: profilePic }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
            <View style={{ width: 1, height: 10 }}></View>
            <TouchableOpacity
              onPress={() => {
                setProfilePic(null);
              }}
            >
              <StyledText text="Cancel" />
            </TouchableOpacity>
          </View>
        ) : (
          <Icon
            size={50}
            type="ionicon"
            name="camera-outline"
            color={grey}
            reverse
            reverseColor={white}
            onPress={pickProfilePic}
          />
        )}
      </View>

      <StyledButton
        title={profilePic ? "Next" : "Skip for now"}
        onPress={() => {
          navigation.navigate("EditHeaderPicture", {
            name: route.params.name,
            username: route.params.username,
            email: route.params.email,
            password: route.params.password,
            profilePic: profilePic,
          });
        }}
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
