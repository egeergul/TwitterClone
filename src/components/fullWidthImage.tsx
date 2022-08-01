import React, { useCallback, useState } from "react";
import { Image, View } from "react-native";

export default function FullWidthImage(props: any) {
  let image = props.requireSource;
  const { width, height } = Image.resolveAssetSource(image);
  const ratio = height / width;
  const AVAILABLE_WIDTH = props.width;

  return (
    <Image
      borderRadius={props.borderRadius}
      source={image}
      style={{ width: AVAILABLE_WIDTH, height: AVAILABLE_WIDTH * ratio }}
      resizeMode="contain"
    />
  );
}
