import { View, StyleSheet, Alert, Image, Text } from "react-native";
import { StyledButton, StyledInput, StyledText } from "../../components";
import { black, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../constants/firebase";
import { useNavigation, StackActions } from "@react-navigation/native";
import { useState } from "react";
import { uploadImage } from "../../constants/storageHelper";
import { NavigationContext } from "../../../App";
import { UserContext } from "../../navigation/mainNav";
import { User } from "../../models";

type Props = NativeStackScreenProps<RootStackParams, "EditBio">;

const EditBioPage = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [bio, setBio] = useState<string>("");

  const signup = async (
    setNavStack: (stack: string) => void,
    setUserInfo: (user: User) => void
  ) => {
    navigation.navigate("Loading");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      route.params.email,
      route.params.password
    );
    const user = userCredential.user;
    var filename = "DEFAULT";
    if (route.params.profilePic) {
      filename = await uploadImage(route.params.profilePic);
    }
    await set(ref(database, "users/" + user.uid), {
      name: route.params.name,
      email: route.params.email,
      password: route.params.password,
      bio: bio,
      profilePicture: filename,
    });

    let newUser = new User(
      route.params.name,
      route.params.email,
      bio,
      filename
    );

    setUserInfo(newUser);
    navigation.dispatch(StackActions.pop(1));
    navigation.navigate("Completed");
  };

  return (
    <UserContext.Consumer>
      {(userContext) => (
        <NavigationContext.Consumer>
          {(navigationContext) => (
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
                title="Skip for now"
                onPress={() =>
                  signup(navigationContext.setNavStack, userContext.setUserInfo)
                }
                backgroundColor={transparent}
                borderColor={black}
                color={black}
                alignSelf={"stretch"}
                margin={[0, 0, 40, 0]}
                borderWidth={1}
              />
            </View>
          )}
        </NavigationContext.Consumer>
      )}
    </UserContext.Consumer>
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