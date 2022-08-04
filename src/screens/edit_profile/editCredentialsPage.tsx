import React, { FC, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";
import { Icon } from "@rneui/base";
import { grey, lightgrey, white, blue, black } from "../../constants/colors";
import { UserContext } from "../../navigation/mainNav";
import { StyledButton } from "../../components";
import {
  USERS,
  database,
  HEADER_PICTURES,
  PROFILE_PICTURES,
} from "../../constants/firebase";
import * as ImagePicker from "expo-image-picker";
import { getDatabase, ref, child, push, update } from "firebase/database";
import {
  deleteImage,
  getImageURL,
  uploadImage,
} from "../../constants/storageHelper";
import { useNavigation, StackActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/authStack";
import { HomeStackParams } from "../../navigation/homeStack";

const { height, width } = Dimensions.get("screen");

const EditCredentialsPage: FC = () => {
  const user = useContext(UserContext).userInfo;
  const setUser = useContext(UserContext).setUserInfo;

  const [name, setName] = useState(user.name);
  const [nameInputColor, setNameInputColor] = useState(lightgrey);

  const [bio, setBio] = useState(user.bio);
  const [bioInputColor, setBioInputColor] = useState(lightgrey);

  const [location, setLocation] = useState("");
  const [locationInputColor, setLocationInputColor] = useState(lightgrey);

  const [website, setWebsite] = useState("");
  const [websiteColor, setWebsiteInputColor] = useState(lightgrey);

  const [headerPic, setHeaderPic] = useState<null | string>(null);
  const [profilePic, setProfilePic] = useState<null | string>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const styledInput = (
    inputName: string,
    textState: string,
    setTextState: (name: string) => void,
    colorState: string,
    setColorState: (color: string) => void,
    placeholder: string,
    isMultiline?: boolean
  ) => {
    return (
      <View>
        <Text style={styles.textInputHeader}>{inputName} </Text>
        {isMultiline == true ? (
          <TextInput
            multiline
            maxLength={160}
            onFocus={() => {
              setColorState(blue);
            }}
            onBlur={() => {
              setColorState(lightgrey);
            }}
            value={textState}
            onChangeText={(newText) => setTextState(newText)}
            placeholder={placeholder}
            style={{
              fontSize: 16,
              borderBottomColor: colorState,
              borderBottomWidth: 1,
              height: 90,
            }}
          />
        ) : (
          <TextInput
            onFocus={() => {
              setColorState(blue);
            }}
            onBlur={() => {
              setColorState(lightgrey);
            }}
            value={textState}
            onChangeText={(newText) => setTextState(newText)}
            placeholder={placeholder}
            style={{
              fontSize: 16,
              borderBottomColor: colorState,
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}
          />
        )}
      </View>
    );
  };

  const pickHeader = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase: 64,
      aspect: [3, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setHeaderPic(result.uri);
    }
  };

  const pickProfilePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      includeBase: 64,
      aspect: [3, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };

  const saveChanges = async () => {
    navigation.navigate("Loading");
    console.log("Loading...");
    const updates: Record<string, string> = {};

    if (name != user.name) {
      updates[USERS + user.uid + "/name"] = name;
      user.name = name;
    }

    if (bio != user.bio) {
      updates[USERS + user.uid + "/bio"] = bio;
      user.bio = bio;
    }

    if (headerPic != null) {
      deleteImage(HEADER_PICTURES, user.headerPicFilename);
      let headerFilename = await uploadImage(HEADER_PICTURES, headerPic);
      let headerPicURL = await getImageURL(HEADER_PICTURES + headerFilename);
      updates[USERS + user.uid + "/headerPictureFilename"] = headerFilename;
      updates[USERS + user.uid + "/headerPicURL"] = headerPicURL;
      user.headerPicURL = headerPicURL;
      user.headerPicFilename = headerFilename;
    }

    if (profilePic != null) {
      deleteImage(PROFILE_PICTURES, user.profilPicFilename);
      let ppFilename = await uploadImage(PROFILE_PICTURES, profilePic);
      let profilePicURL = await getImageURL(PROFILE_PICTURES + ppFilename);
      updates[USERS + user.uid + "/profilePictureFilename"] = ppFilename;
      updates[USERS + user.uid + "/profilePictureURL"] = profilePicURL;
      user.profilePicURL = profilePicURL;
      user.profilPicFilename = ppFilename;
    }

    console.log(updates);
    console.log(user.toString());

    setUser(user);
    update(ref(database), updates);
    console.log("bitiyo");

    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      {/**  HEADER & PROFILE PICTURE SECTION */}
      <View style={{ justifyContent: "center", alignContent: "center" }}>
        <ImageBackground
          style={{
            height: width / 3,
            width: width,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={
            headerPic
              ? { uri: headerPic }
              : user.headerPicURL == "DEFAULT"
              ? require("../../../assets/imgs/default_header.jpg")
              : { uri: user.headerPicURL }
          }
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              backgroundColor: black,
              height: width / 3,
              width: width,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.5,
              zIndex: 1,
            }}
          />
          <View style={{ zIndex: 100, opacity: 1 }}>
            <Icon
              onPress={pickHeader}
              size={30}
              color={white}
              name="add-a-photo"
              type="material"
            />
          </View>
        </ImageBackground>

        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: white,
            borderColor: white,
            borderWidth: 3,
            marginTop: -25,
            marginLeft: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 75, height: 75, borderRadius: 40 }}
            source={
              profilePic
                ? { uri: profilePic }
                : user.profilePicURL == "DEFAULT"
                ? require("../../../assets/imgs/account_man_filled.png")
                : { uri: user.profilePicURL }
            }
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: black,
              opacity: 0.5,
              width: 75,
              height: 75,
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          />
          <View style={{ position: "absolute", zIndex: 100, opacity: 1 }}>
            <Icon
              onPress={pickProfilePic}
              size={30}
              color={white}
              name="add-a-photo"
              type="material"
            />
          </View>
        </View>
      </View>

      {/**  HEADER & PROFILE PICTURE SECTION */}
      <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
        <View>
          {styledInput(
            "Name",
            name,
            setName,
            nameInputColor,
            setNameInputColor,
            "Name cannot be blank"
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          {styledInput(
            "Bio",
            bio,
            setBio,
            bioInputColor,
            setBioInputColor,
            "",
            true
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          {styledInput(
            "Location",
            location,
            setLocation,
            locationInputColor,
            setLocationInputColor,
            ""
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          {styledInput(
            "Website",
            website,
            setWebsite,
            websiteColor,
            setWebsiteInputColor,
            ""
          )}
        </View>

        <StyledButton
          title="Save"
          alignSelf="stretch"
          margin={[40, 10, 0, 10]}
          backgroundColor={blue}
          onPress={() => {
            saveChanges();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default EditCredentialsPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    flexDirection: "column",
  },
  textInputHeader: {
    color: grey,
    fontSize: 16,
    marginBottom: 7,
  },
});
