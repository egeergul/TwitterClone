import React, { FC, useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authStack";
import { auth } from "../constants/firebase";
import HomeStack from "./homeStack";
import { APP_BOTTOM_TAB_STACK, HOME_STACK } from "../constants/navigation";
import AppBottomTabStack from "./appBottomTabStack";
import { NavigationContext } from "../../App";
import { User } from "../models";

const UserContext = createContext({
  userInfo: {} as User,
  setUserInfo: (user: User) => {},
});

const MainNav: FC = () => {
  // Keep the user object from firebase when logged in
  const [user, setUser] = useState<User>();

  function onAuthStateChanged(user: any) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Manually register user info as a global value with context API
  const [userInfo, setUserInfo] = useState<User>({} as User);

  function renderStack(stack: string) {
    if (stack == APP_BOTTOM_TAB_STACK) {
      return <AppBottomTabStack />;
    } else if (stack == HOME_STACK) {
      return <HomeStack />;
    } else {
      return <AuthStack />;
    }
  }

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <NavigationContext.Consumer>
        {(context) => (
          <NavigationContainer>
            {renderStack(context.navStack)}
          </NavigationContainer>
        )}
      </NavigationContext.Consumer>
    </UserContext.Provider>
  );
};

export default MainNav;
export { UserContext };
