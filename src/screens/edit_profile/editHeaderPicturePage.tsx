import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { StyledButton, StyledText } from "../../components";
import { black, grey, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../constants/firebase";
import { useNavigation, StackActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<RootStackParams, "EditHeaderPicture">;

const { width, height } = Dimensions.get("screen");
const EditHeaderPicturePage = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [headerPic, setHeaderPic] = useState<null | string>(null);

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
          <Image
            source={{ uri: headerPic }}
            style={{
              width: width - 40,
              height: (width - 40) / 3,
              alignSelf: "center",
            }}
          />
        ) : (
          <View
            style={{
              padding: 30,
              flexDirection: "row",
              backgroundColor: "#b2b2b2",
              alignSelf: "stretch",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Icon
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

        {headerPic ? (
          <StyledButton
            title="Cancel"
            color={black}
            backgroundColor={transparent}
            onPress={() => setHeaderPic(null)}
          />
        ) : (
          <></>
        )}
        <View
          style={{
            marginTop: 20,
            alignSelf: "baseline",
            alignItems: "center",
          }}
        >
          {route.params.profilePic ? (
            <Image
              source={{ uri: route.params.profilePic }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : (
            <Icon
              type="material-community"
              name="account"
              size={40}
              color={grey}
              reverseColor={white}
              reverse
            />
          )}
          <StyledText
            fontWeight={"bold"}
            fontSize={28}
            text={route.params.name}
          ></StyledText>
        </View>
      </View>

      <StyledButton
        title={headerPic ? "Next" : "Skip for now"}
        onPress={() => {
          navigation.navigate("EditBio", {
            name: route.params.name,
            username: route.params.username,
            email: route.params.email,
            password: route.params.password,
            profilePic: route.params.profilePic,
            headerPic: headerPic,
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

export default EditHeaderPicturePage;
