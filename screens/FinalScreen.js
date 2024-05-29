import React from "react";
import { View, Text, Image, TouchableOpacity, Share} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/Styles";
import * as MediaLibrary from "expo-media-library";

const FinalScreen = ({ route }) => {
  const { processedImage } = route.params;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Options");
  };

  // Сохранение фото в галерею
  const saveImageInDevice = async () => {
    try {
      await MediaLibrary.saveToLibraryAsync(processedImage);
      alert('Фото успешно сохранено в галерее');
    }
    catch (error) {
      alert('Не удалось сохранить фото');
    }
  };

  // Поделиться фото
  const shareImage = async () => {
    try {
      const shareOptions = {
        message: 'Приложение "Прогноз Я" показало, как я буду выглядеть в будущем, если буду вести нездоровый образ жизни!',
        url: processedImage,
      };
      await Share.share(shareOptions);
    } catch (error) {
      alert('Произошла ошибка');
    }
  };

  return (
    <LinearGradient colors = {["#75BEEE", "#CCEDFF"]} style = {styles.container0}> 
      {processedImage ? (
      <View style = {[styles.container2, {width: "100%"}]}>
          <View style = {styles.imageContainer2}>
              <Image source = {{uri: processedImage}} style = {styles.image}/>
          </View>
          <View style = {{alignItems: 'center'}}>
            <Text style = {styles.header}>Сохранить и поделиться</Text>
            <View style = {[styles.iconsContainer, {width: '35%'}]}>
            <TouchableOpacity  style = {styles.iconButton} onPress = {saveImageInDevice}>
                <LinearGradient colors = {["#1449B0", "#0E164B"]} style = {styles.iconBackground}>
                  <Image source = {require('../assets/icons/Vector.png')}/>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity  style = {styles.iconButton} onPress = {shareImage}>
                <LinearGradient colors = {["#1449B0", "#0E164B"]} style = {styles.iconBackground}>
                  <Image source = {require('../assets/icons/Arrow.png')}/>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>) : (<Text style = {[styles.errorText, {marginTop: 150}]}>Ошибка загрузки изображения</Text>)}
      <TouchableOpacity style = {[styles.button, styles.shadow]} onPress = {handlePress}>
          <Text style = {styles.buttonText}>Начать сначала</Text>
      </TouchableOpacity>
      
    </LinearGradient>
  );
};

export default FinalScreen;