import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FinalScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://replicate.delivery/mgxm/806bea64-bb51-4c8a-bf4d-15602eb60fdd/1287.jpg" }}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>Сохранить и поделиться</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: "https://img.icons8.com/material-rounded/48/000000/download.png" }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: "https://img.icons8.com/fluency/48/000000/instagram-new.png" }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: "https://img.icons8.com/color/48/000000/whatsapp.png" }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: "https://img.icons8.com/color/48/000000/telegram-app.png" }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: "https://img.icons8.com/color/48/000000/vk-circled.png" }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.startOverButton} onPress={handlePress}>
        <Text style={styles.startOverText}>Начать сначала</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: "80%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 20,
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  icon: {
    width: 40,
    height: 40,
  },
  startOverButton: {
    marginTop: 20,
    backgroundColor: "#303F9F",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  startOverText: {
    color: "white",
    fontSize: 18,
  },
});

export default FinalScreen;
