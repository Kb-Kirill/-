import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

const windowHeight = Dimensions.get("window").height;

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
        maximumTrackTintColor="background: rgba(204, 237, 255, 1)"
        thumbTintColor="#233195"
        onValueChange={(value) => onSliderChange(getYearValue(value))}
        value={sliderValue} // Ensure that sliderValue is passed correctly
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
    //marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: windowHeight / 14,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    //paddingTop: 10,
  },
  label: {
    textAlign: "center",
    width: 80,
    fontSize: 16,
  },
});

export default CustomSlider;
