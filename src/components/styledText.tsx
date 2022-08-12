import React from "react";
import { Text, TextStyle } from "react-native";
import { black } from "../constants/colors";

interface Props {
  // Required props
  text: string;

  // Optional props
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  textAlign?: TextStyle["textAlign"];
  margin?: [number, number, number, number];
}

// Use the full props within the actual component
const StyledText = ({
  text,
  color,
  fontSize,
  fontWeight,
  textAlign,
  margin,
}: Props) => {
  return (
    <Text
      style={{
        marginTop: margin ? margin[0] : 0,
        marginRight: margin ? margin[1] : 0,
        marginBottom: margin ? margin[2] : 0,
        marginLeft: margin ? margin[3] : 0,

        color: color || black,
        fontSize: fontSize || 16,
        fontWeight: fontWeight || "normal",
        textAlign: textAlign || "auto",
      }}
    >
      {text}
    </Text>
  );
};

export default StyledText;
