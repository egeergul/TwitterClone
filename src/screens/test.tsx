import { Button } from "@rneui/base";
import React, { FC } from "react";
import { View, Text } from "react-native";
import { auth } from "../constants/firebase";
const Test: FC = () => {
  return (
    <View>
      <Text>Ege</Text>
      <Button
        title={"log out"}
        onPress={() => {
          auth.signOut().then(() => console.log("User signed out!"));
        }}
      />
    </View>
  );
};

export default Test;
