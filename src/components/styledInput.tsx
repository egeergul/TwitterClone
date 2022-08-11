import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { blue, grey, transparent } from "../constants/colors";
import StyledText from "./styledText";
import { Icon } from "@rneui/themed";

interface Props {
  // Required props
  placeholder: string;
  onChangeText: (text: string) => void;

  // Optional props
  secureTextEntry?: boolean;
  maxLength?: number;
  multiline?: boolean;
}

const StyledInput = ({
  placeholder,
  onChangeText,
  secureTextEntry,
  maxLength,
  multiline,
}: Props) => {
  const [color, setColor] = useState<string>(grey);
  const [remainingColor, setRemainingColor] = useState<string>(grey);
  const [length, setLength] = useState<number>(0);
  const [hidden, setHidden] = useState<boolean>(secureTextEntry || false);

  return (
    <View style={styles.container}>
      <View style={[styles.border, { borderColor: color }]}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {multiline || false ? (
            <TextInput
              multiline
              style={styles.textInput}
              placeholderTextColor={grey}
              placeholder={placeholder}
              secureTextEntry={hidden}
              onFocus={() => setColor(blue)}
              onBlur={() => setColor(grey)}
              maxLength={maxLength}
              onChangeText={(text) => {
                onChangeText(text);
                setLength(text.length);
                if (maxLength) {
                  if (text.length >= maxLength * 0.8) {
                    setRemainingColor("red");
                  } else {
                    setRemainingColor(grey);
                  }
                }
              }}
            />
          ) : (
            <TextInput
              style={styles.textInput}
              placeholderTextColor={grey}
              placeholder={placeholder}
              secureTextEntry={hidden}
              onFocus={() => setColor(blue)}
              onBlur={() => setColor(grey)}
              maxLength={maxLength}
              onChangeText={(text) => {
                onChangeText(text);
                setLength(text.length);
                if (maxLength) {
                  if (text.length >= maxLength * 0.8) {
                    setRemainingColor("red");
                  } else {
                    setRemainingColor(grey);
                  }
                }
              }}
            />
          )}

          {secureTextEntry && (
            <Icon
              style={{ marginRight: 10 }}
              type="ionicon"
              color={grey}
              onPress={() => setHidden(!hidden)}
              name={hidden ? "eye-outline" : "eye-off-outline"}
            />
          )}
        </View>
      </View>

      {maxLength != undefined && (
        <StyledText
          text={length + "/" + maxLength}
          color={remainingColor}
          fontSize={12}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    alignItems: "flex-end",
  },
  border: {
    alignSelf: "stretch",
    backgroundColor: transparent,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StyledInput;
