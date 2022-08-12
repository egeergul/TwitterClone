import { FC, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { StyledButton, StyledText } from "../../components";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, StackActions } from "@react-navigation/native";
import { NavigationContext } from "../../../App";
import { HOME_STACK } from "../../constants/navigation";

const EditProfileCompleted: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const setNavStack = useContext(NavigationContext).setNavStack;
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 50, height: 50, marginBottom: 50 }}
        source={require("../../../assets/imgs/logo.png")}
      />
      <StyledText
        text="Your profile is created"
        fontWeight={"bold"}
        fontSize={24}
      />
      <StyledButton
        margin={[35, 0, 0, 0]}
        title="Continue"
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
          setNavStack(HOME_STACK);
        }}
        alignSelf="stretch"
      />
    </View>
  );
};

export default EditProfileCompleted;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
