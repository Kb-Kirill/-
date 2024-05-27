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
    <LinearGradient colors = {["#75BEEE", "#CCEDFF"]} style = {styles.container0}> 
      {processedImage ? (
        <View style = {[styles.container2, {width: "100%"}]}>
          <View style = {styles.imageContainer2}>
              <Image source = { {uri: processedImage} } style = {styles.image} />
          </View>
          <View>
            <Text style = {styles.header}>Сохранить и поделиться</Text>
            <View style = {[styles.iconsContainer, {width: '85%'}]}>
              <TouchableOpacity>
                <Image source = { require('../assets/icons/download.png') }style = {styles.iconButton}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source = {require('../assets/icons/viber.png')} style = {styles.iconButton}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source = {require('../assets/icons/whats app.png')} style = {styles.iconButton}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source = {require('../assets/icons/telegram.png')} style = {styles.iconButton}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source = {require('../assets/icons/vk.png')} style = {styles.iconButton}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        ) : (
          <Text style = {[styles.errorText, {marginTop: 150}]}>Ошибка загрузки изображения</Text>
        )}
      <TouchableOpacity style = {[styles.button, styles.shadow]} onPress = {handlePress}>
          <Text style = {styles.buttonText}>Начать сначала</Text>
      </TouchableOpacity>
      
    </LinearGradient>
  );
};

export default FinalScreen;