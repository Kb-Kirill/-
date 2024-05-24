import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const windowHeight = Dimensions.get("window").height;

const FinalScreen = ({ route }) => {
  const { processedImage } = route.params;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Options");
  };

  return (
    <LinearGradient colors={["#75BEEE", "#CCEDFF"]} style={styles.container}>
      
      <View style={styles.imageContainer}>
        {processedImage ? (
          <Image source={{ uri: processedImage }} style={styles.image} />
        ) : (
          <Text style={styles.errorText}>Ошибка загрузки изображения</Text>
        )}
      </View>
      <View>
      <Text style={styles.text}>Сохранить и поделиться</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={ require('../assets/icons/download.png') }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/icons/instagram.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/icons/whats app.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/icons/telegram.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/icons/vk.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      </View>
      
      <TouchableOpacity style={styles.startOverButton} onPress={handlePress}>
        <Text style={styles.startOverText} >Начать сначала</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: windowHeight / 12,
    //paddingHorizontal: 24,
  },
  imageContainer: {
    //marginTop: 50,
    width: "85%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 20,
    //marginVertical: 10,
  },
  errorText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginVertical: 10,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    //marginVertical: 20,
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
  },
  icon: {
    //width: 40,
    //height: 40,
  },
  startOverButton: {
    justifyContent: 'center',
    width: 164,
    height: 50,
    backgroundColor: '#233195',
    borderRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    //top: 20,
    /*shadowColor: "#182369",
    shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowRadius: 10,
        shadowOpacity: 0.8,*/
  },
  startOverText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'os-bold',
    textAlign: 'center',
  },
});

export default FinalScreen;
