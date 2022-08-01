import React, { Component, FC, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Image } from "react-native";

import { StyledButton, StyledText, TabMenu } from "../components";
import { Icon } from "@rneui/themed";
import { transparent, white, black, grey, blue } from "../constants/colors";
import { TweetsTab } from "../screens";
import { TweetsAndRepliesTab } from "../screens";
import { MediaTab } from "../screens";
import { LikesTab } from "../screens";
const { height, width } = Dimensions.get("screen");

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const renderTabs = () => {
    if (activeTab == 0) {
      return <TweetsTab />;
    } else if (activeTab == 1) {
      return <TweetsAndRepliesTab />;
    } else if (activeTab == 2) {
      return <MediaTab />;
    } else {
      return <LikesTab />;
    }
  };

  const MY_HEIGHT = height - 400;

  return (
    <ScrollView style={{}}>
      <View>
        <Image
          style={{ width: width, height: width / 3 }}
          source={require("../../../assets/imgs/header_example.jpg")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "stretch",
            paddingHorizontal: 10,
          }}
        >
          <Image
            style={{
              width: width / 5,
              height: width / 5,
              borderRadius: width / 10,
              marginTop: -width / 10,
              borderWidth: 5,
              borderColor: white,
            }}
            source={require("../../../assets/imgs/pp_example.jpg")}
          />
          <StyledButton
            title="Edit Profile"
            backgroundColor={transparent}
            margin={[10, 0, 0, 0]}
            color={black}
            padding={[5, 10, 5, 10]}
            borderColor={grey}
            borderWidth={1}
            onPress={() => console.log("pressed")}
          />
        </View>

        <View style={{ padding: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <StyledText
              text="Boşun Sanati"
              fontWeight="bold"
              fontSize={24}
              margin={[0, 10, 0, 0]}
            />
            {true ? (
              <Icon name="locked" type="fontisto" />
            ) : (
              <Icon name="unlocked" type="fontisto" />
            )}
          </View>
          <StyledText text="@BosunSanati" color={grey} margin={[0, 0, 0, 0]} />
          <StyledText
            text="Boş yapmanin kitabini yazdik."
            margin={[10, 0, 10, 0]}
          />
          <StyledText
            text="Born October 23, 2001   Joined July 2020"
            color={grey}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <StyledText text="21" fontWeight="bold" />
            <StyledText margin={[0, 0, 0, 3]} text="Following" color={grey} />
            <StyledText margin={[0, 0, 0, 10]} text="12" fontWeight="bold" />
            <StyledText margin={[0, 0, 0, 3]} text="Following" color={grey} />
          </View>
        </View>
      </View>

      <View style={{ height: height - 100 }}>
        <TabMenu
          tabs={["Tweets", "Tweets & replies", "Media", "Likes"]}
          setActiveTab={setActiveTab}
        />
        {renderTabs()}
      </View>
    </ScrollView>
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

export default ProfilePage;
