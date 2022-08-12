import { View, StyleSheet, Alert, Image, Text } from "react-native";
import { StyledButton, StyledInput, StyledText } from "../../components";
import { black, blue, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import {
  auth,
  database,
  HEADER_PICTURES,
  PROFILE_PICTURES,
  USERS,
} from "../../constants/firebase";
import { useNavigation, StackActions } from "@react-navigation/native";
import { useContext, useState } from "react";
import { getImageURL, uploadImage } from "../../constants/storageHelper";
import { UserContext } from "../../navigation/mainNav";
import { User } from "../../models";

type Props = NativeStackScreenProps<RootStackParams, "EditBio">;

const EditBioPage = ({ route }: Props) => {
  // Constants
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const setUserInfo = useContext(UserContext).setUserInfo;

  // Hooks
  const [bio, setBio] = useState<string>("");

  // Functions
  const signup = async () => {
    navigation.navigate("Loading");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      route.params.email,
      route.params.password
    );
    const user = userCredential.user;
    var filename = "DEFAULT";
    if (route.params.profilePic) {
      filename = await uploadImage(PROFILE_PICTURES, route.params.profilePic);
    }
    let profilePicURL = "DEFAULT";
    if (filename != "DEFAULT") {
      profilePicURL = await getImageURL(PROFILE_PICTURES + filename);
    }

    var headerFilename = "DEFAULT";
    if (route.params.headerPic) {
      headerFilename = await uploadImage(
        HEADER_PICTURES,
        route.params.headerPic
      );
    }
    let headerPicURL = "DEFAULT";
    if (headerFilename != "DEFAULT") {
      headerPicURL = await getImageURL(HEADER_PICTURES + headerFilename);
    }

    const joinedAt = Date.now();

    await set(ref(database, USERS + user.uid), {
      uid: userCredential.user.uid,
      name: route.params.name,
      username: route.params.username,
      email: route.params.email,
      isPublic: true,
      password: route.params.password,
      bio: bio,
      profilePictureFilename: filename,
      profilePictureURL: profilePicURL,
      headerPictureFilename: headerFilename,
      headerPicURL: headerPicURL,
      joinedAt: joinedAt,
    });

    let newUser = new User(
      userCredential.user.uid,
      route.params.name,
      route.params.username,
      route.params.email,
      true,
      bio,
      profilePicURL,
      filename,
      headerPicURL,
      headerFilename,
      joinedAt
    );

    setUserInfo(newUser);
    navigation.dispatch(StackActions.pop(1));
    navigation.navigate("Completed");
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch" }}>
        <StyledText
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={28}
          text="Describe yourself"
        />
        <View style={{ width: 1, height: 20 }}></View>
        <StyledText
          textAlign={"left"}
          text="What makes you special? Don't think too hard, just have fun with it."
        />
      </View>

      <StyledInput
        multiline={true}
        placeholder="Your bio"
        maxLength={160}
        onChangeText={(text) => setBio(text)}
      />

      <StyledButton
        title={bio ? "Sign Up" : "Skip for now"}
        onPress={signup}
        backgroundColor={bio ? blue : transparent}
        borderColor={black}
        color={bio ? white : black}
        alignSelf={"stretch"}
        margin={[0, 0, 40, 0]}
        borderWidth={bio ? 0 : 1}
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

export default EditBioPage;
