import React, { useState, useEffect, useContext } from "react";
import { View, Text} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalContext } from "../context/GlobalContext";
import { styles } from "../styles/Styles";

REPLICATE_API_TOKEN = "r8_HSuX4OZtrjT7wCeSq2NOV0xOOEb7UlU1F9Hrm";

const LoadingPhotoScreen = ({ route }) => {
  const [currentDot, setCurrentDot] = useState(0);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigation = useNavigation();
  const { userImage } = route.params;

  const { yearValue, age, selectedSubstance, selectedDependency } =
  useContext(GlobalContext);

  const [ageInput, setAgeInput] = useState(parseInt(age) + parseInt(yearValue));

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setCurrentDot((prevDot) => (prevDot + 1) % 3);
    }, 500); // Обновляем анимацию каждые 0.5 секунды

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000); // Обновляем таймер каждую секунду

    return () => {
      clearInterval(dotInterval);
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    const processImage = async () => {
      try {
        const base64Image = await FileSystem.readAsStringAsync(userImage, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const response = await axios.post(
          "https://api.replicate.com/v1/predictions",
          {
            version:
              "9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c",
            input: {
              image: `data:image/jpeg;base64,${base64Image}`,
              target_age: ageInput,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${REPLICATE_API_TOKEN}`,
            },
          }
        );

        const predictionId = response.data.id;

        const getPredictionStatus = async () => {
          const statusResponse = await axios.get(
            `https://api.replicate.com/v1/predictions/${predictionId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${REPLICATE_API_TOKEN}`,
              },
            }
          );
          return statusResponse.data;
        };

        let predictionData;
        while (true) {
          predictionData = await getPredictionStatus();
          if (
            predictionData.status === "succeeded" ||
            predictionData.status === "failed"
          ) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        if (predictionData.status === "succeeded" && !hasRedirected) {
          setHasRedirected(true);
          navigation.navigate("Final", {
            processedImage: predictionData.output,
          });
        } else if (predictionData.status === "failed") {
          setError("Prediction failed");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Invalid API token");
        } else {
          setError("An error occurred: " + error.message);
        }
      }
    };

    if (!hasRedirected) {
      processImage();
    }
  }, [hasRedirected, navigation]);

  return (
    <LinearGradient
    colors = {["#1449B0", "#75BEEE"]} style = {styles.container1}>
      <View style = {styles.dotsContainer}>
        <View style = {[styles.dot, currentDot === 0 && styles.activeDot]} />
        <View style = {[styles.dot, currentDot === 1 && styles.activeDot]} />
        <View style = {[styles.dot, currentDot === 2 && styles.activeDot]} />
      </View>
      {error ? (
        <Text style = {[styles.errorText, {width: "85%"} ]}>{error}</Text>
      ) : (
        <View >
          <Text style = {[styles.header, {fontSize: 24, color: 'white'}]}>Загружаем результат</Text>
          <Text style = {styles.loadingText}>Прошло времени: {timer}</Text>
          <Text style = {styles.loadingText}>Ожидаемый возраст: {ageInput}</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default LoadingPhotoScreen;