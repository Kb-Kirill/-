import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
REPLICATE_API_TOKEN = "penis"

const FinalScreen = () => {
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const start = Date.now();
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

        // Функция для получения статуса предсказания
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

        // Ожидание завершения предсказания
        let predictionData;
        while (true) {
          predictionData = await getPredictionStatus();
          if (predictionData.status === "succeeded" || predictionData.status === "failed") {
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 5000)); // Ждать 5 секунд перед повторной проверкой
        }

        if (predictionData.status === "succeeded") {
          setProcessedImage(predictionData.output);
        } else {
          setError("Prediction failed");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Invalid API token");
        } else {
          setError("An error occurred: " + error.message);
        }
      } finally {
        const end = Date.now();
        setElapsedTime(end - start);
        setLoading(false);
      }
    };

    processImage();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          processedImage && <Image source={{ uri: processedImage }} style={styles.image} />
        )}
      </View>
      <Text style={styles.text}>Прошло времени: {elapsedTime / 1000} сек.</Text>
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
      <TouchableOpacity style={styles.startOverButton}>
        <Text style={styles.startOverText}>Начать сначала 1</Text>
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
    marginVertical: 10,
  },
  errorText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginVertical: 10,
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