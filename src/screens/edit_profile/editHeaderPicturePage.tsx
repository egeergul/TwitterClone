import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StyledButton, StyledText } from "../../components";
import { black, grey, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { database } from "../../constants/firebase";
import { ref, child, get } from "firebase/database";

type Props = NativeStackScreenProps<RootStackParams, "EditHeaderPicture">;

const EditHeaderPicturePage = ({ route }: Props) => {
  const [user, setUser] = useState(null);

  const getUserInfo = (uid: string): any => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**useEffect(() => {
    const user = getUserInfo(route.params.user.uid);
    return user; // unsubscribe on unmount
  }, []);
 */
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

      <StyledText text={user ? user : "User could not be found!"}></StyledText>

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

export default EditHeaderPicturePage;
