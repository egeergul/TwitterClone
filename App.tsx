import React, { createContext, useState } from "react";
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
