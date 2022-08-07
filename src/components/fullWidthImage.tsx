import React, { useCallback, useState } from "react";
import { Image, View, Text } from "react-native";

export default function FullWidthImage(props: any) {
  const AVAILABLE_WIDTH = props.width;
  const [ratio, setRatio] = useState(1);
  let image;

  if (props.requireSource) {
    image = props.requireSource;
    const { width, height } = Image.resolveAssetSource(image);
    setRatio(height / width);
  } else if (props.uriSource) {
    Image.getSize(props.uriSource, (width, height) => {
      setRatio(height / width);
    });
  }

  return (
    <Image
      borderRadius={15}
      source={image ? image : { uri: props.uriSource }}
      style={{ width: AVAILABLE_WIDTH, height: AVAILABLE_WIDTH * ratio }}
      resizeMode="contain"
    />
  );
}
