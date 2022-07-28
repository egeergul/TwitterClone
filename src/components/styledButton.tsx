import React, { FC } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { black, white } from "../constants/colors";

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
}
// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  color: white,
  backgroundColor: black,
  fontSize: 16,
  fontWeight: "bold",
  borderColor: black,
  borderWidth: 0,
  alignSelf: "center",
  margin: [0, 0, 0, 0],
};

// Use the full props within the actual component
const StyledButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",

        marginTop: props.margin[0],
        marginRight: props.margin[1],
        marginBottom: props.margin[2],
        marginEnd: props.margin[3],
        alignSelf: props.alignSelf,
        backgroundColor: props.backgroundColor,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: props.color,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

// Be sure to set the default props
StyledButton.defaultProps = defaultProps;
export default StyledButton;
