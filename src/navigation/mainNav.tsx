import React, { FC, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./appStack";
import AuthStack from "./authStack";
import { auth } from "../constants/firebase";

const MainNav: FC = () => {
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNav;
