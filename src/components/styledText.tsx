import React, { FC } from "react";
import { Text } from "react-native";

import { black } from "../constants/colors";

// Required props
interface RequiredProps {
  text: string;
}
// Optional props
interface OptionalProps {
  color: string;
  fontSize: number;
  fontWeight: any;
  textAlign: any;
  margin: [number, number, number, number];
}
// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  color: black,
  fontSize: 16,
  fontWeight: "normal",
  textAlign: "auto",
  margin: [0, 0, 0, 0],
};

// Use the full props within the actual component
const StyledText = (props: Props) => {
  return (
    <Text
      style={{
        marginTop: props.margin[0],
        marginRight: props.margin[1],
        marginBottom: props.margin[2],
        marginLeft: props.margin[3],

        color: props.color,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        textAlign: props.textAlign,
      }}
    >
      {props.text}
    </Text>
  );
};

// Be sure to set the default props
StyledText.defaultProps = defaultProps;
export default StyledText;
