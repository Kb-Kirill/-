import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CheckPhotoScreen from "../screens/CheckPhotoScreen";
import LoadingPhotoScreen from "../screens/LoadingPhotoScreen";
import StartPageScreen from "../screens/StartPage";
import OptionsScreen from "../screens/OptionsScreen";
import AddPhoto from "../screens/AddPhoto";
import FinalScreen from "../screens/FinalScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckPhoto"
        component={CheckPhotoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoadingPhoto"
        component={LoadingPhotoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartPage"
        component={StartPageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Options"
        component={OptionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Final"
        component={FinalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
