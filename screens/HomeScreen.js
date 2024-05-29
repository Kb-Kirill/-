import React from "react";
import { View, Text, TouchableOpacity, Dimensions} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/Styles";

const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Options");
  };


  return (
    <LinearGradient colors = {["#1449B0", "#75BEEE"]} style = {styles.container1}>
      <View style = {[styles.container1, {marginBottom: windowHeight / 6}]}>
        <Text style = {styles.title}>Прогноз Я</Text>
      </View>
      <View
      
      style = {styles.homeButtonContainer}>
        <TouchableOpacity style = {styles.homeButton} onPress={handlePress}>
            <Text style = {[styles.buttonText, {fontSize: 18}]}>Начать</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;