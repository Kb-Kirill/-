import React, { useState, useContext } from "react";
import {View, Text, TextInput, TouchableOpacity, Pressable, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/Styles";
import { GlobalContext } from "../context/GlobalContext.js";

const OptionsScreen = () => {
  const {
    age,
    setAge,
    selectedSubstance,
    setSelectedSubstance,
    selectedDependency,
    setSelectedDependency,
  } = useContext(GlobalContext);
  const [error, setError] = useState("");

  const handleAgeChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (
      numericValue === "" ||
      (parseInt(numericValue) >= 0 && parseInt(numericValue) <= 100)
    ) {
      setAge(numericValue);
    }
  };

  const navigation = useNavigation();

  const handlePress = () => {
    if (!selectedSubstance || !selectedDependency || !age) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    navigation.navigate("AddPhoto");
  };

  return (
    <LinearGradient colors = {["#75BEEE", "#CCEDFF"]} style = {styles.gradient}>
      <ScrollView contentContainerStyle = {styles.scrollViewContent}>
        <View style = {[styles.container2, {width: '100%'}]}>
          {error ? (
            <View style = {styles.errorContainer}>
              <Text style = {[styles.mainText, {color: "white", textAlign: "center",}]}>{error}</Text>
            </View>
          ) : null}
          <View style = {{width: '85%'}}>
            <Text style = {styles.header}>Ваш возраст</Text>
            <View style = {styles.category}>
              <View style = {[styles.field, styles.ageInput, styles.shadow]}>
                <TextInput
                  style = {styles.inputInner}
                  keyboardType="numeric"
                  value = {age}
                  onChangeText = {handleAgeChange}
                />
              </View>
            </View>
            <Text style = {styles.header}>Тип вещества</Text>
            <View style = {styles.category}>
              <Pressable
                style = {[styles.option, styles.field, styles.shadow]}
                onPress = {() => setSelectedSubstance("alcohol")}>
                <View style = {styles.radioCircle}>
                  {selectedSubstance === "alcohol" && (
                    <View style = {styles.selectedRb}/>
                  )}
                </View>
                <Text style = {styles.mainText}>Алкоголь</Text>
              </Pressable>
              <Pressable
                style={[styles.option, styles.field, styles.shadow]}
                onPress={() => setSelectedSubstance("drugs")}>
                <View style = {styles.radioCircle}>
                  {selectedSubstance === "drugs" && (
                    <View style = {styles.selectedRb}/>
                  )}
                </View>
                <Text style = {styles.mainText}>Наркотики</Text>
              </Pressable>
              <Pressable 
                style = {[styles.option, styles.field, styles.shadow]}
                onPress = {() => setSelectedSubstance("cigarettes")}>
                <View style = {styles.radioCircle}>
                  {selectedSubstance === "cigarettes" && (
                    <View style = {styles.selectedRb}/>
                  )}
                </View>
                <Text style = {styles.mainText}>Сигареты</Text>
              </Pressable>
            </View>
            <Text style = {styles.header}>Степень зависимости</Text>
            <View style = {styles.category}>
              <Pressable
                style = {[styles.option, styles.field, styles.shadow]}
                onPress = {() => setSelectedDependency("moderate")}>
                <View style = {styles.radioCircle}>
                  {selectedDependency === "moderate" && (
                    <View style = {styles.selectedRb}/>
                  )}
                </View>
                <Text style = {styles.mainText}>Умеренная</Text>
              </Pressable>
              <Pressable
                style = {[styles.option, styles.field, styles.shadow]}
                onPress = {() => setSelectedDependency("severe")}
              >
                <View style = {styles.radioCircle}>
                  {selectedDependency === "severe" && (
                    <View style = {styles.selectedRb}/>
                  )}
                </View>
                <Text style = {styles.mainText}>Тяжёлая</Text>
              </Pressable>
            </View>
          </View>
          <View></View>
          <TouchableOpacity onPress = {handlePress} 
          style = {[styles.button, styles.shadow, {marginTop: 40}, error && {marginTop: 20}]}>
            <Text style = {styles.buttonText}>Далее</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default OptionsScreen;