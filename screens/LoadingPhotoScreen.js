import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalContext } from "../context/GlobalContext";
import { styles } from "../styles/Styles";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

const LoadingPhotoScreen = ({ route }) => {
  
  const [currentDot, setCurrentDot] = useState(0);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(0);
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigation = useNavigation();
  const { userImage } = route.params;

  const { yearValue, age } = useContext(GlobalContext);
  const ageInput = (parseInt(age) + parseInt(yearValue)).toString();

  const { selectedSubstance, selectedDependency } = useContext(GlobalContext);

  const setImageBasedOnSubstance = (selectedSubstance) => {
    const substanceImages = {
      alcohol:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Case_11-rightN.JPG/551px-Case_11-rightN.JPG?20100803114324",
      cigarettes:
        "https://ge.ceny.pro/wp-content/uploads/2021/12/nikomin-preimushchestva-1.jpg",
      drugs: "https://piximus.net/media/20720/faces-of-meth-38.jpg",
    };
    return substanceImages[selectedSubstance];
  };

  const setStrengthBasedOnAddiction = (selectedDependency) => {
    const substanceImages = {
      moderate: 0.2,
      severe: 0.85,
    };
    return substanceImages[selectedSubstance];
  };

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setCurrentDot((prevDot) => (prevDot + 1) % 3);
    }, 500);

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    const processImage = async () => {
      try {
        const base64User = await FileSystem.readAsStringAsync(userImage, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const response = await axios.post(
          "https://api.replicate.com/v1/predictions",
          {
            version:
              "9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c",
            input: {
              image: `data:image/jpeg;base64,${base64User}`,
              target_age: ageInput,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer  ${REPLICATE_API_TOKEN}`,
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
                Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
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

        if (predictionData.status === "succeeded") {
          const processedImageUrl = predictionData.output;
          console.log('2 request');
          const response = await axios.post(
            "https://api.replicate.com/v1/predictions",
            {
              version:
                "db2c826b6a7215fd31695acb73b5b2c91a077f88a2a264c003745e62901e2867",
              input: {
                image_1: processedImageUrl,
                image_2: setImageBasedOnSubstance(selectedSubstance),
                control_image: processedImageUrl,
                image_1_strength:
                  setStrengthBasedOnAddiction(selectedDependency),
                image_2_strength: 1,
                prompt:
                  "an svg illustration, sharp, solid color, thick outline",
                upscale_2x: false,
                animate: false,
                render_method: "full",
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
              },
            }
          );

          const secondPredictionId = response.data.id;

          const getSecondPredictionStatus = async () => {
            const statusResponse = await axios.get(
              `https://api.replicate.com/v1/predictions/${secondPredictionId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
                },
              }
            );
            return statusResponse.data;
          };

          let secondPredictionData;
          while (true) {
            secondPredictionData = await getSecondPredictionStatus();
            if (
              secondPredictionData.status === "succeeded" ||
              secondPredictionData.status === "failed"
            ) {
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }

          if (secondPredictionData.status === "succeeded" && !hasRedirected) {
            console.log(processedImageUrl);
            console.log(secondPredictionData.output[0]);
            setHasRedirected(true);
            navigation.navigate("Final", {
              processedImage: processedImageUrl,
              secondProcessedImage: secondPredictionData.output[0],
            });
          } else if (secondPredictionData.status === "failed") {
            setError("Second prediction failed");
          }
        } else if (predictionData.status === "failed") {
          setError("Prediction failed");
        }
      } catch (error) {
        console.error(
          "Error: ",
          error.response ? error.response.data : error.message
        );
        if (error.response && error.response.status === 401) {
          setError("Invalid API token");
        } else {
          setError(
            "An error occurred: " +
              (error.response ? error.response.data.error : error.message)
          );
        }
      }
    };

    if (!hasRedirected) {
      processImage();
    }
  }, [hasRedirected, navigation, userImage, ageInput]);

  return (
    <LinearGradient colors={["#1449B0", "#75BEEE"]} style={styles.container1}>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, currentDot === 0 && styles.activeDot]} />
        <View style={[styles.dot, currentDot === 1 && styles.activeDot]} />
        <View style={[styles.dot, currentDot === 2 && styles.activeDot]} />
      </View>
      {error ? (
        <Text style={[styles.errorText, { width: "85%" }]}>{error}</Text>
      ) : (
        <View>
          <Text style={[styles.header, { fontSize: 24, color: "white" }]}>
            Загружаем результат
          </Text>
          <Text style={styles.loadingText}>Прошло времени: {timer}</Text>
          <Text style={styles.loadingText}>Ожидаемый возраст: {ageInput}</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default LoadingPhotoScreen;
