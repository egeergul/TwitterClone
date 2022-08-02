import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";

import { StyledButton, StyledInput, StyledText } from "../../components";
import { black, grey, transparent, white } from "../../constants/colors";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParams, "EditProfilePicture">;

const EditUsername = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [username, setUsername] = useState<null | string>();

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
        onPress={() => {
          Alert.alert("CHECK IF IT IS UNIQUE");
          navigation.navigate("EditProfilePicture", {
            name: route.params.name,
            username: username!,
            email: route.params.email,
            password: route.params.password,
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

export default EditUsername;
