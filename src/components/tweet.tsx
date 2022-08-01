import { Icon } from "@rneui/base";
import React, { FC } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { FullWidthImage } from ".";
import { grey, lightgrey } from "../constants/colors";
import StyledText from "./styledText";

// Required props
interface RequiredProps {
  title: string;
  onPress: () => void;
}
// Optional props
interface OptionalProps {
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontWeight: any;
  borderColor: any;
  borderWidth: number;
  alignSelf: any;
  margin: [number, number, number, number];
  padding: [number, number, number, number];
}
// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  color: "white",
  backgroundColor: "black",
  fontSize: 16,
  fontWeight: "bold",
  borderColor: "black",
  borderWidth: 0,
  alignSelf: "center",
  margin: [0, 0, 0, 0],
  padding: [10, 10, 10, 10],
};

const { height, width } = Dimensions.get("screen");

const Tweet = () => {
  return (
    <View
      style={{
        margin: 10,
        borderBottomColor: lightgrey,
        borderBottomWidth: 1,
      }}
    >
      {/* PINNED */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Icon
          name="pin"
          type="material-community"
          color={grey}
          size={14}
          style={{ alignSelf: "flex-start", marginStart: width / 7 - 5 }}
        />
        <StyledText
          text="Pinned Tweet"
          color={grey}
          fontWeight="bold"
          fontSize={14}
        />
      </View>
      {/* MAIN */}
      <View
        style={{
          flexDirection: "row",
          width: (11 * width) / 14,
        }}
      >
        <Image
          source={require("../../assets/imgs/pp_example.jpg")}
          style={{
            width: width / 7,
            height: width / 7,
            borderRadius: width / 14,
          }}
        />

        <View
          style={{
            marginLeft: 10,
            flexDirection: "column",
            width: (11 * width) / 14,
          }}
        >
          {/* USERNAME & DATE */}
          <View
            style={{
              marginBottom: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <StyledText text="Boşun Sanatı" fontWeight={"bold"} />
            <View style={{ flexDirection: "row" }}>
              <StyledText text="22 Mar 21" color={grey} />
              <Icon
                color={grey}
                type="ionicon"
                size={16}
                name="ellipsis-vertical"
              />
            </View>
          </View>

          {/* TWEET TEXT */}
          <StyledText text="Lorem egeli alicik egeli aslıhan  egeli alicik egeli aslıhan  egeli alicik egeli aslıhan demirkafa aslıhan  egeli alicik egeli aslıhan demirkafa aslıhan  egeli alicik egeli aslıhan demirkafa aslıhan  egeli alicik egeli aslıhan demirkafa" />
          {/* TWEET MEDIA */}
          <View style={{ marginTop: 10 }}>
            <FullWidthImage
              requireSource={require("../../assets/imgs/pp_example.jpg")}
              width={(width * 11) / 14}
              borderRadius={15}
            />
          </View>

          {/* ICONS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            <Icon type="evilicon" name="comment" />
            <Icon type="evilicon" name="retweet" />
            <Icon type="ionicon" name="heart-outline" />
            <Icon type="evilicon" name="share-google" />
            <Icon type="evilicon" name="chart" />
          </View>
        </View>
      </View>
    </View>
  );
};

Tweet.defaultProps = defaultProps;
export default Tweet;

const styles = StyleSheet.create({
  container: {},
});
