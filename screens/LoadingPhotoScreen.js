import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const LoadingPhotoScreen = () => {
  const [currentDot, setCurrentDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDot((prevDot) => (prevDot + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, currentDot === 0 && styles.activeDot]} />
        <View style={[styles.dot, currentDot === 1 && styles.activeDot]} />
        <View style={[styles.dot, currentDot === 2 && styles.activeDot]} />
      </View>
      <Text style={styles.text}>Загружаем результат</Text>
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
    marginBottom: 40, // increased margin
  },
  dot: {
    width: 30, // increased size
    height: 30, // increased size
    borderRadius: 15, // increased radius
    backgroundColor: "#B3E5FC",
    marginHorizontal: 10, // increased margin
  },
  activeDot: {
    backgroundColor: "#303F9F",
  },
  text: {
    fontSize: 32, // increased font size
    fontWeight: "bold",
  },
});

export default LoadingPhotoScreen;
