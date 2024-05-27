import React from "react";
import { View, Text, Image, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/Styles";

const FinalScreen = ({ route }) => {
  const { processedImage } = route.params;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Options");
  };

  return (
    <LinearGradient colors = {["#75BEEE", "#CCEDFF"]} style = {[styles.container2, {justifyContent: 'space-between'}]}> 
      <View style = {styles.imageContainer2}>
        {processedImage ? (
          <Image source = { {uri: processedImage} } style = {styles.image} />
        ) : (
          <Text style = {styles.errorText}>Ошибка загрузки изображения</Text>
        )}
      </View>
      <View>
      <Text style = {styles.header}>Сохранить и поделиться</Text>
      <View style = {[styles.iconsContainer, {width: '85%'}]}>
        <TouchableOpacity style = {styles.iconButton}>
          <Image
            source = { require('../assets/icons/download.png') }
            style = {styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.iconButton}>
          <Image source = {require('../assets/icons/instagram.png')} style = {styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.iconButton}>
          <Image source = {require('../assets/icons/whats app.png')} style = {styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.iconButton}>
          <Image source = {require('../assets/icons/telegram.png')} style = {styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source = {require('../assets/icons/vk.png')} style = {styles.icon}/>
        </TouchableOpacity>
      </View>
      </View>
      <TouchableOpacity style = {[styles.button, styles.shadow]} onPress={handlePress}>
        <Text style = {styles.buttonText}>Начать сначала</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default FinalScreen;