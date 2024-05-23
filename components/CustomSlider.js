import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

const CustomSlider = ({ sliderValue, onSliderChange }) => {
  const getYearValue = (value) => {
    switch (value) {
      case 1:
        return 5;
      case 2:
        return 10;
      case 3:
        return 20;
      case 4:
        return 30;
      default:
        return 5;
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        style={{ width: 320 }}
        minimumValue={1}
        maximumValue={4}
        step={1}
        minimumTrackTintColor="#233195"
        maximumTrackTintColor="#ccedff"
        thumbTintColor="#233195"
        onValueChange={onSliderChange}
        value={sliderValue}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>5 лет</Text>
        <Text style={styles.label}>10 лет</Text>
        <Text style={styles.label}>20 лет</Text>
        <Text style={styles.label}>30 лет</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 320,
    paddingTop: 10,
  },
  label: {
    textAlign: "center",
    width: 80,
    fontSize: 16,
  },
});

export default CustomSlider;
