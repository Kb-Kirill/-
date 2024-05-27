import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { styles } from "../styles/Styles";

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
    <View style = {styles.sliderContainer}>
      <Slider
        style = {{ width: 320 }}
        minimumValue = {1}
        maximumValue = {4}
        step = {1}
        minimumTrackTintColor = "#233195"
        maximumTrackTintColor = "background: rgba(204, 237, 255, 1)"
        thumbTintColor = "#233195"
        onValueChange = {(value) => onSliderChange(getYearValue(value))}
        value = {sliderValue}
      />
      <View style = {styles.sliderLabelContainer}>
        <Text style = {styles.sliderLabel}>5 лет</Text>
        <Text style = {styles.sliderLabel}>10 лет</Text>
        <Text style = {styles.sliderLabel}>20 лет</Text>
        <Text style = {styles.sliderLabel}>30 лет</Text>
      </View>
    </View>
  );
};

export default CustomSlider;