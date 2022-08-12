import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { StyledButton, StyledText } from "../../components";
import { blue, grey, white } from "../../constants/colors";
import { Icon } from "@rneui/themed";

const DirectMessagesPage = () => {
  return (
    <View style={styles.container}>
      <StyledText
        text="Welcome to your inbox!"
        fontWeight={"bold"}
        fontSize={32}
      />
      <StyledText
        margin={[15, 0, 0, 0]}
        color={grey}
        text="Drop a line, share Tweets and more with private conversations between you and others on Twitter."
      />

      <StyledButton
        title="Write a message"
        onPress={() => Alert.alert("DM coming soon!")}
        color={white}
        alignSelf="flex-start"
        margin={[20, 0, 0, 0]}
        backgroundColor={blue}
      />

      <TouchableOpacity
        onPress={() => Alert.alert("DM coming soon!")}
        style={styles.newTweet}
      >
        <Icon
          name="email-plus-outline"
          type="material-community"
          color="white"
          size={26}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: white,
    padding: 40,
  },
  newTweet: {
    zIndex: 1000,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: blue,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default DirectMessagesPage;
