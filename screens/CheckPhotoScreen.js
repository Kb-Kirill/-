import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/Styles";

const CheckPhotoScreen = ({ route }) => {
  const navigation = useNavigation();

  const { userImage } = route.params;

  const redirectBack = () => {
    navigation.goBack();
  };

  const redirectTest = () => {
    navigation.navigate("LoadingPhoto", { userImage: userImage });
  };

  return (
    <LinearGradient colors = {["#75BEEE", "#CCEDFF"]} style = {styles.gradient}>
      <View style = {[styles.gradient, {backgroundColor: "#E0F7FA"}]}>
        <View style = {styles.imageContainer1}>
          <Image style = {[styles.image, {width: '85%'}]} source = {{ uri: userImage }} />
        </View>
        <View
          style = {styles.checkPhotoButtonContainer}>
          <TouchableOpacity style = {[styles.button, styles.shadow, {width: '35%'}]} onPress = {redirectBack}>
            <Text style = {styles.buttonText}>Назад</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.button, styles.shadow, {width: '35%'}]} onPress = {redirectTest}>
            <Text style = {styles.buttonText}>Далее</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CheckPhotoScreen;