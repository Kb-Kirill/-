import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";


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
    <LinearGradient
      colors={["#75BEEE", "#CCEDFF"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: userImage }} />
        </View>
        
        <View
          style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={redirectBack}>
            <Text style={styles.buttonText}>Назад</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={redirectTest}>
            <Text style={styles.buttonText}>Далее</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    
    backgroundColor: "#E0F7FA",
  },
  imageContainer: {
    width: "100%",
    height: "85%", // Увеличиваем высоту контейнера изображения
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080C27",
  },
  image: {
    width: "85%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flex: 1, // Уменьшаем высоту контейнера кнопок
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0E164B",
    
    paddingVertical: 10, // Уменьшаем отступы сверху и снизу
  },
  button: {
    backgroundColor: "#233195",
    width: '35%',
    height: 50, // Уменьшаем высоту кнопок
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16, // Уменьшаем размер текста на кнопках
    fontFamily: 'os-bold',
  },
});

export default CheckPhotoScreen;
