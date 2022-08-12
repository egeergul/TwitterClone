import { useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { StyledButton, StyledText } from "../../components";
import { black, grey, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<RootStackParams, "EditHeaderPicture">;

const { width, height } = Dimensions.get("screen");

const EditHeaderPicturePage = ({ route }: Props) => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // Hooks
  const [headerPic, setHeaderPic] = useState<null | string>(null);

  // Functions
  const emptyHeaderPic = () => {
    setHeaderPic(null);
  };

  const goToEditBio = () => {
    navigation.navigate("EditBio", {
      name: route.params.name,
      username: route.params.username,
      email: route.params.email,
      password: route.params.password,
      profilePic: route.params.profilePic,
      headerPic: headerPic,
    });
  };

  const pickProfilePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase: 64,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setHeaderPic(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch" }}>
        <StyledText
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={28}
          text="Pick a header"
        />
        <View style={{ width: 1, height: 20 }}></View>
        <StyledText
          textAlign={"left"}
          text="People who visit your profile will see it. Show your style."
        />
      </View>

      <View style={{ alignSelf: "stretch" }}>
        {headerPic ? (
          <>
            <View
              style={{
                position: "absolute",
                right: -20,
                top: -20,
                zIndex: 100,
              }}
            >
              <Icon
                size={15}
                type="ionicon"
                name="close"
                onPress={emptyHeaderPic}
                color={black}
                reverseColor={white}
                reverse
              />
            </View>
            <Image
              source={{ uri: headerPic }}
              style={{
                width: width - 80,
                height: (width - 80) / 2.5,
                alignSelf: "center",
              }}
            />
          </>
        ) : (
          <View style={styles.headerPlaceholder}>
            <Icon
              backgroundColor={"red"}
              size={25}
              type="ionicon"
              name="camera-outline"
              color={grey}
              reverse
              reverseColor={white}
              onPress={pickProfilePic}
            />
          </View>
        )}

        <View style={styles.userInfo}>
          <Image
            source={
              route.params.profilePic
                ? { uri: route.params.profilePic }
                : require("../../../assets/imgs/account_man_filled.png")
            }
            style={styles.profilePic}
          />
          <StyledText
            fontWeight={"bold"}
            fontSize={28}
            text={route.params.name}
          ></StyledText>
        </View>
      </View>

      <StyledButton
        title={headerPic ? "Next" : "Skip for now"}
        onPress={goToEditBio}
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
  headerPlaceholder: {
    width: width - 80,
    height: (width - 80) / 2.5,
    flexDirection: "column",
    backgroundColor: "#b2b2b2",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    marginTop: -37,
    marginLeft: 20,
    alignSelf: "baseline",
    alignItems: "flex-start",
  },
  profilePic: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderColor: white,
    borderWidth: 3,
  },
});

export default EditHeaderPicturePage;
