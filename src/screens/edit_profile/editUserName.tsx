import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";

import { StyledButton, StyledInput, StyledText } from "../../components";
import { black, grey, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { USERS, database } from "../../constants/firebase";
import {
  onValue,
  orderByChild,
  ref,
  query,
  equalTo,
  get,
  child,
} from "firebase/database";

type Props = NativeStackScreenProps<RootStackParams, "EditProfilePicture">;

const EditUsername = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [username, setUsername] = useState<null | string>();

  const checkUsernameIsUnique = async (username: string): Promise<boolean> => {
    let result = true;
    const topUserPostsRef = query(
      ref(database, "users"),
      orderByChild("username"),
      equalTo(username)
    );

    await get(topUserPostsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          result = false;
        } else {
          console.log("Username is unique");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return result;
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch" }}>
        <StyledText
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={28}
          text="Select a username"
        />
        <View style={{ width: 1, height: 20 }}></View>
        <StyledText
          textAlign={"left"}
          text="People will mention you by using this username. Once you pick a username, you cannot change it later."
        />
      </View>

      <StyledInput
        maxLength={35}
        placeholder="Username"
        onChangeText={setUsername}
      />

      <StyledButton
        title="Next"
        onPress={async () => {
          const isUnique = await checkUsernameIsUnique(username!);
          if (isUnique) {
            navigation.navigate("EditProfilePicture", {
              name: route.params.name,
              username: username!,
              email: route.params.email,
              password: route.params.password,
            });
          } else {
            Alert.alert("This username is already taken!");
          }
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

export default EditUsername;
