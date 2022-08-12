import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import StyledText from "./styledText";
import { blue, lightgrey, white } from "../constants/colors";

interface Props {
  tabs: string[];
  setActiveTab: (tab: number) => void;
  initialTab?: number;
}

const TabMenu = ({ tabs, setActiveTab, initialTab }: Props) => {
  const [activeIndex, setActiveIndex] = useState(initialTab || 0);

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setActiveIndex(index);
              setActiveTab(index);
            }}
          >
            {activeIndex == index ? (
              <View style={styles.borderBottom}>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
    borderBottomColor: lightgrey,
    borderBottomWidth: 1,
  },
  borderBottom: {
    borderBottomColor: blue,
    borderBottomWidth: 3,
    paddingBottom: 7,
  },
});
export default TabMenu;
