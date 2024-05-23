import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: userImage }} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={redirectBack}>
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={redirectTest}>
          <Text style={styles.buttonText}>Далее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
  },
  imageContainer: {
    width: "100%",
    height: "70%", // Увеличиваем высоту контейнера изображения
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: "80%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flex: 1, // Уменьшаем высоту контейнера кнопок
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
    paddingVertical: 10, // Уменьшаем отступы сверху и снизу
  },
  button: {
    backgroundColor: "#303F9F",
    width: 150,
    height: 50, // Уменьшаем высоту кнопок
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18, // Уменьшаем размер текста на кнопках
    fontWeight: "bold",
  },
});

export default CheckPhotoScreen;
