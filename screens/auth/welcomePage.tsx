import React, { FC } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { StyledButton, StyledText } from "../../components";
import { black, blue, grey, white, transparent } from "../../constants/colors";

const WelcomePage: FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/imgs/logo.png")}
      />
      <View>
        <StyledText
          text="See what's happening in the world right now."
          fontSize={36}
          fontWeight="bold"
          textAlign={"left"}
        />

        <StyledButton
          title="Create account"
          color={white}
          backgroundColor={blue}
          alignSelf="stretch"
          margin={[30, 0, 0, 0]}
          onPress={() => alert("Pressed")}
        />
      </View>

      <View style={{ flexDirection: "row", marginBottom: 50 }}>
        <StyledText text="Have an account already?" color={grey} />
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            alert("pressed");
          }}
        >
          <StyledText text="Log in" color={blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    marginTop: 10,
    width: 30,
    height: 30,
  },
});

export default WelcomePage;
