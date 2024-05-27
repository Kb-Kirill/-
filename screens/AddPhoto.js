import React, { useState, useContext } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomSlider from "../components/CustomSlider";
import { GlobalContext } from "../context/GlobalContext.js";
import { styles} from "../styles/Styles";

const AddPhoto = () => {
  const [userImage, setUserImage] = useState(null);
  const [sliderValue, setSliderValue] = useState(1);
  const { yearValue, setYearValue } = useContext(GlobalContext);

  const handleSliderChange = (value) => {
    setYearValue(value);
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
    <LinearGradient colors = {["#75BEEE", "#CCEDFF"]} style = {[styles.gradient, {alignItems: "center"}]}>
      <View style = {styles.container2}>
        <View style = {{alignItems: "center"}}>
          <View>
            <Text style = {styles.header}>Период времени</Text>
            <CustomSlider sliderValue = {sliderValue} onSliderChange = {handleSliderChange}/>
          </View>
          <View >
            <Text style = {styles.header}>Ваше фото</Text>
            <View style = {styles.iconsContainer}>
              <TouchableOpacity style = {[styles.photoButton, styles.shadow, {shadowRadius: 10}]} onPress = {handleTakePhoto}>
                <Icon style = {styles.icon} name="camera-retro" />
                <Text style = {[styles.mainText, {paddingTop: 10, fontSize: 14, textAlign: "center"}]}>Сделать фото</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style = {[styles.photoButton, styles.shadow, {shadowRadius: 10}]}
                onPress = {handleChooseFromGallery}>
                <Icon style = {styles.icon} name = "photo" />
                <Text style = {[styles.mainText, {paddingTop: 10, fontSize: 14, textAlign: "center"}]}>Загрузить из галереи</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style = {styles.nextButtonContainer}>
          <TouchableOpacity style = {[styles.button, styles.shadow, {alignSelf: "center"}]} onPress = {goBack}>
            <Text style = {styles.buttonText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AddPhoto;