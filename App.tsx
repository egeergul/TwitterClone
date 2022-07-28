import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { WelcomePage } from "./screens";

import { black } from "./constants/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <WelcomePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
});
