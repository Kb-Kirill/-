import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./MainStackNavigator";
import { GlobalProvider } from "../context/GlobalContext.js";

const AppNavigator = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default AppNavigator;
