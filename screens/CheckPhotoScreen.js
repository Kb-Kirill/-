import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const CheckPhotoScreen = () => {

  const navigation = useNavigation();

  const redirectHome = () => {
    navigation.navigate("Home");
  };

  const redirectTest = () => {
    navigation.navigate("LoadingPhoto");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={{ uri: 'https://replicate.delivery/mgxm/806bea64-bb51-4c8a-bf4d-15602eb60fdd/1287.jpg' }} // Замените на вашу картинку
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={redirectHome}>
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={redirectTest}>
          <Text style={styles.buttonText}>Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  imageContainer: {
    flex: 7, // 70% высоты
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: '5%', // Добавляем отступ сверху   
  },
  image: {
    width: '70%', // Делаем изображение меньше
    height: '80%',
    backgroundColor: '#E0E0E0',
  },
  buttonContainer: {
    flex: 3, // 30% высоты
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#303F9F',
    width: 150, // Фиксированная ширина кнопок
    height: 60, // Фиксированная высота кнопок
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20, // Увеличим текст на кнопках
    fontWeight: 'bold',
  },
});

export default CheckPhotoScreen;