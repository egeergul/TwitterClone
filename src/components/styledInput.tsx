import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { blue, grey, transparent } from "../constants/colors";
import StyledText from "./styledText";
import { Icon } from "@rneui/themed";

// Required props
interface RequiredProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}
// Optional props
interface OptionalProps {
  secureTextEntry: boolean;
  maxLength: number | undefined;
}
// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  secureTextEntry: false,
  maxLength: undefined,
};

// Use the full props within the actual component

const StyledInput = (props: Props) => {
  const [color, setColor] = useState<string>(grey);
  const [remainingColor, setRemainingColor] = useState<string>(grey);
  const [length, setLength] = useState<number>(0);
  const [hidden, setHidden] = useState<boolean>(props.secureTextEntry);
  return (
    <View style={{ alignSelf: "stretch", alignItems: "flex-end" }}>
      <View
        style={{
          alignSelf: "stretch",
          backgroundColor: transparent,
          borderRadius: 5,
          borderColor: color,
          borderWidth: 1,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{ flex: 1, padding: 20 }}
            placeholderTextColor={grey}
            placeholder={props.placeholder}
            secureTextEntry={hidden}
            onFocus={() => setColor(blue)}
            onBlur={() => setColor(grey)}
            onChangeText={(text) => {
              props.onChangeText(text);
              setLength(text.length);
              if (props.maxLength) {
                if (text.length >= props.maxLength * 0.8) {
                  setRemainingColor("red");
                } else {
                  setRemainingColor(grey);
                }
              }
            }}
            maxLength={props.maxLength}
          />
          {props.secureTextEntry ? (
            <View
              style={{
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <Icon
                type="ionicon"
                onPress={() => setHidden(!hidden)}
                name={hidden ? "eye-outline" : "eye-off-outline"}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
      {props.maxLength == undefined ? (
        <></>
      ) : (
        <StyledText
          text={length + "/" + props.maxLength}
          color={remainingColor}
          fontSize={12}
        />
      )}
    </View>
  );
};

// Be sure to set the default props
StyledInput.defaultProps = defaultProps;
export default StyledInput;
