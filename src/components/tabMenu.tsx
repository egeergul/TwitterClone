import React, { useState } from "react";
import {
  Dimensions,
  TabBarIOS,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StyledText from "./styledText";
import { black, blue, grey, lightgrey, white } from "../constants/colors";
import { Alert } from "native-base";

interface RequiredProps {
  tabs: string[];
  setActiveTab: (tab: number) => void;
  initialTab?: number;
}

const { height, width } = Dimensions.get("screen");

const TabMenu = (props: RequiredProps) => {
  const [activeIndex, setActiveIndex] = useState(props.initialTab || 0);
  return (
    <View
      style={{
        paddingTop: 10,
        backgroundColor: white,
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "stretch",
        borderBottomColor: lightgrey,
        borderBottomWidth: 1,
      }}
    >
      {props.tabs.map((tab, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setActiveIndex(index);
              props.setActiveTab(index);
            }}
          >
            {activeIndex == index ? (
              <View
                style={{
                  borderBottomColor: blue,
                  borderBottomWidth: 3,
                  paddingBottom: 7,
                }}
              >
                <StyledText
                  text={tab}
                  textAlign="center"
                  fontWeight={activeIndex == index ? "bold" : "normal"}
                />
              </View>
            ) : (
              <View>
                <StyledText text={tab} textAlign="center" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabMenu;
