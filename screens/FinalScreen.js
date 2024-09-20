import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/Styles";
import * as MediaLibrary from "expo-media-library";

const FinalScreen = ({ route }) => {
  const { processedImage, secondProcessedImage } = route.params;
  const navigation = useNavigation();

  // State for managing current image
  const [currentImage, setCurrentImage] = useState(processedImage);

  const handlePress = () => {
    navigation.navigate("Options");
  };

  // Toggle the current image
  const toggleImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === processedImage ? secondProcessedImage : processedImage
    );
  };

  // Save the current image in device gallery
  const saveImageInDevice = async () => {
    try {
      await MediaLibrary.saveToLibraryAsync(currentImage);
      alert("Фото успешно сохранено в галерее");
    } catch (error) {
      alert("Не удалось сохранить фото");
    }
  };

  // Share the current image
  const shareImage = async () => {
    try {
      const shareOptions = {
        message:
          'Приложение "Прогноз Я" показало, как я буду выглядеть в будущем, если буду вести нездоровый образ жизни!',
        url: currentImage,
      };
      await Share.share(shareOptions);
    } catch (error) {
      alert("Произошла ошибка");
    }
  };

  return (
    <LinearGradient colors={["#75BEEE", "#CCEDFF"]} style={styles.container0}>
      {currentImage ? (
        <View style={[styles.container2, { width: "100%" }]}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.mainText}>
              {currentImage === processedImage
                ? "Здоровый образ жизни"
                : "Зависимый"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.imageContainer2}
            onPress={toggleImage}
          >
            <Image source={{ uri: currentImage }} style={styles.image} />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.header}>Сохранить и поделиться</Text>
            <View style={[styles.iconsContainer, { width: "35%" }]}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={saveImageInDevice}
              >
                <LinearGradient
                  colors={["#1449B0", "#0E164B"]}
                  style={styles.iconBackground}
                >
                  <Image source={require("../assets/icons/Vector.png")} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={shareImage}>
                <LinearGradient
                  colors={["#1449B0", "#0E164B"]}
                  style={styles.iconBackground}
                >
                  <Image source={require("../assets/icons/Arrow.png")} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <Text style={[styles.errorText, { marginTop: 150 }]}>
          Ошибка загрузки изображения
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Начать сначала</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default FinalScreen;
