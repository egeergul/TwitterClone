import React, { createContext, useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { AUTH_STACK } from "./src/constants/navigation";
import MainNav from "./src/navigation/mainNav";

const NavigationContext = createContext({
  navStack: "",
  setNavStack: (name: string) => {},
});

export default function App() {
  const [navStack, setNavStack] = useState(AUTH_STACK);

  return (
    <NavigationContext.Provider value={{ navStack, setNavStack }}>
      <MainNav />
    </NavigationContext.Provider>
  );
}

export { NavigationContext };
