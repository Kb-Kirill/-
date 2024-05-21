import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

REPLICATE_API_TOKEN = "r8_dG4I9OlkjMFjtpgRKMhrKByDnG0J8EB41cfuk";

const LoadingPhotoScreen = () => {
  const [currentDot, setCurrentDot] = useState(0);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigation = useNavigation();

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
        const response = await axios.post(
          "https://api.replicate.com/v1/predictions",
          {
            version: "9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c",
            input: {
              image: "https://replicate.delivery/mgxm/806bea64-bb51-4c8a-bf4d-15602eb60fdd/1287.jpg",
              target_age: "80"
            }
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${REPLICATE_API_TOKEN}`
            }
          }
        );

        const predictionId = response.data.id;

        const getPredictionStatus = async () => {
          const statusResponse = await axios.get(
            `https://api.replicate.com/v1/predictions/${predictionId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${REPLICATE_API_TOKEN}`
              }
            }
          );
          return statusResponse.data;
        };

        let predictionData;
        while (true) {
          predictionData = await getPredictionStatus();
          if (predictionData.status === "succeeded" || predictionData.status === "failed") {
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
        }

        if (predictionData.status === "succeeded" && !hasRedirected) {
          setHasRedirected(true);
          navigation.navigate('Final', { processedImage: predictionData.output });
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
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, currentDot === 0 && styles.activeDot]} />
        <View style={[styles.dot, currentDot === 1 && styles.activeDot]} />
        <View style={[styles.dot, currentDot === 2 && styles.activeDot]} />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View>
          <Text style={styles.text}>Загружаем результат</Text>
          <Text style={styles.timerText}>Прошло времени: {timer} </Text>
        </View>
      )}
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
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#B3E5FC",
    marginHorizontal: 10,
  },
  activeDot: {
    backgroundColor: "#303F9F",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  timerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
  errorText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
  },
});

export default LoadingPhotoScreen;
