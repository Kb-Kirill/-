import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Test");
  };

  return (
    <LinearGradient
      colors={["#233195", "#314DB0", "#75BEEE", "#CCEDFF"]}
      locations={[0, 0.3863, 0.7156, 0.991]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Прогноз Я</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Начать</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: windowHeight / 6,
  },
  title: {
    fontFamily: "os-extrabold",
    fontSize: 48,
    color: "#FFFFFF",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 140,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#233195",
    width: "65%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "os-bold",
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default HomeScreen;
