import React, { useCallback, useState } from "react";
import { Image, View } from "react-native";

export default function FullWidthImage(props: any) {
  const AVAILABLE_WIDTH = props.width;
  let ratio = 1;
  let image;

  if (props.requireSource) {
    image = props.requireSource;
    const { width, height } = Image.resolveAssetSource(image);
    ratio = height / width;
  } else {
    Image.getSize(props.uriSoruce, (width, height) => {
      ratio = height / width;
    });
  }

  return (
    <Image
      borderRadius={15}
      source={image ? image : { uri: props.uriSoruce }}
      style={{ width: AVAILABLE_WIDTH, height: AVAILABLE_WIDTH * ratio }}
      resizeMode="contain"
    />
  );
}
