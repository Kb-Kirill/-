import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomSlider from "../components/CustomSlider";

const AddPhoto = () => {
  const [selectedYears, setSelectedYears] = useState(5);
  const [userImage, setUserImage] = useState(null);
  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const navigation = useNavigation();

  const handleTakePhoto = async () => {
    let { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      status = newStatus;
    }
    if (status !== "granted") {
      alert(
        "Извините, приложению необходим доступ к камере чтобы сделать фото!"
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUserImage(uri);
      navigation.navigate("CheckPhoto", { userImage: uri });
    }
  };

  const handleChooseFromGallery = async () => {
    // Запрашиваем разрешения
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Извините, приложению необходим доступ к камере чтобы выбрать фото!"
      );
      return;
    }

    // Запускаем image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUserImage(uri);
      navigation.navigate("CheckPhoto", { userImage: uri });
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sliderLabel}>Период времени</Text>
      <CustomSlider
        sliderValue={sliderValue}
        onSliderChange={handleSliderChange}
      />
      <Text style={styles.sliderLabel}>Ваше фото</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Icon style={styles.icon} name="camera-retro" />
          <Text style={styles.buttonText}>Сделать фото</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleChooseFromGallery}
        >
          <Icon style={styles.icon} name="photo" />
          <Text style={styles.buttonText}>Загрузить из галереи</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={goBack}>
          <Text style={styles.nextButtonText}>Назад</Text>
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
    marginTop: 20,
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
    marginTop: 40,
  },
  button: {
    backgroundColor: "rgba(204, 237, 255, 1)",
    width: 150,
    height: 131,
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    paddingTop: 10,
    fontFamily: "os-regular",
    fontSize: 14,
    lineHeight: 16,
    color: "#000",
    textAlign: "center",
  },
  nextButtonContainer: {
    width: "100%",
    marginTop: 264,
  },
  nextButton: {
    backgroundColor: "#233195",
    width: 164,
    height: 50,
    borderRadius: 12,
    alignSelf: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontFamily: "os-bold",
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  icon: {
    alignSelf: "center",
    fontSize: 40,
  },
  sliderLabel: {
    marginTop: 70,
    fontFamily: "os-bold",
    fontSize: 24,
  },
});

export default AddPhoto;
