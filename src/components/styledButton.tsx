import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { black, white } from "../constants/colors";

// Props
interface Props {
  // required
  title: string;
  onPress: () => void;

  //optionals
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: any;
  borderColor?: any;
  borderWidth?: number;
  alignSelf?: any;
  margin?: [number, number, number, number];
  padding?: [number, number, number, number];
}

const StyledButton = ({
  title,
  onPress,
  color,
  backgroundColor,
  fontSize,
  fontWeight,
  borderColor,
  borderWidth,
  alignSelf,
  margin,
  padding,
}: Props) => {
  const styles = StyleSheet.create({
    style: {
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",

      marginTop: margin ? margin[0] : 0,
      marginRight: margin ? margin[1] : 0,
      marginBottom: margin ? margin[2] : 0,
      marginLeft: margin ? margin[3] : 0,

      paddingTop: padding ? padding[0] : 10,
      paddingRight: padding ? padding[1] : 10,
      paddingBottom: padding ? padding[2] : 10,
      paddingLeft: padding ? padding[3] : 10,

      alignSelf: alignSelf || "center",
      backgroundColor: backgroundColor || black,
      borderWidth: borderWidth || 0,
      borderColor: borderColor || black,
    },
  });

  return (
    <TouchableOpacity style={styles.style} onPress={onPress}>
      <Text
        style={{
          color: color || white,
          fontSize: fontSize || 16,
          fontWeight: fontWeight || "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
