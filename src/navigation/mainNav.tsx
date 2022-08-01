import React, { FC, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authStack";
import { auth } from "../constants/firebase";
import HomeStack from "./homeStack";
import { NavigationContext } from "../../App";
import {
  APP_BOTTOM_TAB_STACK,
  AUTH_STACK,
  HOME_STACK,
  LOADING_STACK,
} from "../constants/navigation";
import AppBottomTabStack from "./appBottomTabStack";

const MainNav: FC = () => {
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
  }

  function renderStack(stack: string) {
    if (stack == APP_BOTTOM_TAB_STACK) {
      return <AppBottomTabStack />;
    } else if (stack == HOME_STACK) {
      return <HomeStack />;
    } else {
      return <AuthStack />;
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContext.Consumer>
      {(context) => (
        <NavigationContainer>
          {renderStack(context.navStack)}
        </NavigationContainer>
      )}
    </NavigationContext.Consumer>
  );
};

export default MainNav;
