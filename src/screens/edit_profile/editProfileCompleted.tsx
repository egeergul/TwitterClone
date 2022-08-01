import { FC } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { StyledButton, StyledText } from "../../components";
import { RootStackParams } from "../../navigation/authStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, StackActions } from "@react-navigation/native";
import { NavigationContext } from "../../../App";
import { HOME_STACK } from "../../constants/navigation";

const EditProfileCompleted: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <NavigationContext.Consumer>
      {(context) => (
        <View style={styles.container}>
          <Image
            style={{ width: 50, height: 50, marginBottom: 50 }}
            source={require("../../../assets/imgs/logo.png")}
          />
          <StyledText
            text="Your profile is updated"
            fontWeight={"bold"}
            fontSize={24}
          />
          <StyledButton
            margin={[35, 0, 0, 0]}
            title="Continue"
            onPress={() => {
              navigation.dispatch(StackActions.popToTop());
              context.setNavStack(HOME_STACK);
            }}
            alignSelf="stretch"
          />
        </View>
      )}
    </NavigationContext.Consumer>
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
