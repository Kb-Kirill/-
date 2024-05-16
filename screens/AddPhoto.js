import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

const AddPhoto = () => {
  const [selectedYears, setSelectedYears] = useState(5);
  const [photoUri, setPhotoUri] = useState(null);

  const navigation = useNavigation();

  const handleSliderChange = (value) => {
    setSelectedYears(value);
  };

  const handleTakePhoto = () => {
    // Реализуйте функционал для сделать фото
  };

  const handleChooseFromGallery = () => {
    // Реализуйте функционал для загрузки из галереи
  };

  const handleNext = () => {
    navigation.navigate("CheckPhoto");
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Период времени</Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={30}
          step={5}
          value={selectedYears}
          onValueChange={handleSliderChange}
          maximumTrackTintColor="rgba(204, 237, 255, 1)"
          minimumTrackTintColor="rgba(204, 237, 255, 1)"
          thumbTintColor="#233195"
        />
        <View style={styles.sliderMarks}>
          <Text style={styles.mark}>5 лет</Text>
          <Text style={styles.mark}>10 лет</Text>
          <Text style={styles.mark}>20 лет</Text>
          <Text style={styles.mark}>30 лет</Text>
        </View>
      </View>
      <Text style={styles.sliderLabel}>Ваше фото</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Сделать фото</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleChooseFromGallery}
        >
          <Text style={styles.buttonText}>Загрузить из галереи</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    marginTop: 20, // Увеличен отступ сверху
  },
  sliderContainer: {
    width: "100%",
  },
  sliderLabel: {
    fontFamily: "os-bold", // Изменен на os-bold
    fontSize: 20, // Изменен на 20
    color: "#000", // Изменен на черный
    marginBottom: 10,
    marginTop: 50,
    textAlign: "center", // Выравнивание по центру
  },
  slider: {
    width: "80%",
    alignSelf: "center",
  },
  sliderMarks: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  mark: {
    fontSize: 12,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(204, 237, 255, 1)",
    width: 150, // Увеличенная ширина
    height: 131,
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "os-regular",
    fontSize: 16, // Уменьшенный размер шрифта
    color: "#000",
    textAlign: "center",
  },
  nextButtonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 50,
  },
  nextButton: {
    backgroundColor: "#233195",
    width: "45%",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 12,
    alignSelf: "center", // Выравнивание по центру по горизонтали
  },
  nextButtonText: {
    fontFamily: "os-bold",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default AddPhoto;
