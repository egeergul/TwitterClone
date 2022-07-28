import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./appstack";
import AuthStack from "./authStack";

const MainNav: FC = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default MainNav;
