import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import ImageLoad from "react-native-img-placeholder";

interface Props {
  width: number;
  requireSource?: any;
  uriSource?: string;
}

export default function FullWidthImage({
  width,
  requireSource,
  uriSource,
}: Props) {
  const AVAILABLE_WIDTH = width;
  const [ratio, setRatio] = useState(1);

  let image;

  useEffect(() => {
    if (requireSource) {
      image = requireSource;
      const { width, height } = Image.resolveAssetSource(image);
      setRatio(height / width);
    } else if (uriSource) {
      Image.getSize(uriSource, (width, height) => {
        setRatio(height / width);
      });
    }
  }, []);

  return (
    <ImageLoad
      borderRadius={15}
      source={image ? image : { uri: uriSource }}
      style={{ width: AVAILABLE_WIDTH, height: AVAILABLE_WIDTH * ratio }}
      resizeMode="contain"
    />
  );
}
