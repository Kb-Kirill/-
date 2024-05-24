import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const windowHeight = Dimensions.get("window").height;

const OptionsScreen = () => {
  const [age, setAge] = useState("");
  const [selectedSubstance, setSelectedSubstance] = useState(null);
  const [selectedDependency, setSelectedDependency] = useState(null);
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
    <LinearGradient
      colors={["#75BEEE", "#CCEDFF"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.otherPages}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <View style={styles.container}>
            <Text style={styles.header}>Ваш возраст</Text>
            <View style={styles.category}>
              <View style={styles.inputBorder}>
                <TextInput
                  style={styles.inputInner}
                  keyboardType="numeric"
                  value={age}
                  onChangeText={handleAgeChange}
                />
              </View>
            </View>
            <Text style={styles.header}>Тип вещества</Text>
            <View style={styles.category}>
              <Pressable
                style={[
                  styles.option,
                  /*selectedSubstance === "alcohol" && styles.selectedOption,*/
                ]}
                onPress={() => setSelectedSubstance("alcohol")}
              >
                <View style={styles.radioCircle}>
                  {selectedSubstance === "alcohol" && (
                    <View style={styles.selectedRb} />
                  )}
                </View>
                <Text style={styles.mainText}>Алкоголь</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.option,
                  /*selectedSubstance === "drugs" && styles.selectedOption,*/
                ]}
                onPress={() => setSelectedSubstance("drugs")}
              >
                <View style={styles.radioCircle}>
                  {selectedSubstance === "drugs" && (
                    <View style={styles.selectedRb} />
                  )}
                </View>
                <Text style={styles.mainText}>Наркотики</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.option,
                  /*selectedSubstance === "cigarettes" && styles.selectedOption,*/
                ]}
                onPress={() => setSelectedSubstance("cigarettes")}
              >
                <View style={styles.radioCircle}>
                  {selectedSubstance === "cigarettes" && (
                    <View style={styles.selectedRb} />
                  )}
                </View>
                <Text style={styles.mainText}>Сигареты</Text>
              </Pressable>
            </View>
            <Text style={styles.header}>Степень зависимости</Text>
            <View style={styles.category}>
              <Pressable
                style={[
                  styles.option,
                  /*selectedDependency === "moderate" && styles.selectedOption,*/
                ]}
                onPress={() => setSelectedDependency("moderate")}
              >
                <View style={styles.radioCircle}>
                  {selectedDependency === "moderate" && (
                    <View style={styles.selectedRb} />
                  )}
                </View>
                <Text style={styles.mainText}>Умеренная</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.option,
                  /*selectedDependency === "severe" && styles.selectedOption,*/
                ]}
                onPress={() => setSelectedDependency("severe")}
              >
                <View style={styles.radioCircle}>
                  {selectedDependency === "severe" && (
                    <View style={styles.selectedRb} />
                  )}
                </View>
                <Text style={styles.mainText}>Тяжёлая</Text>
              </Pressable>
            </View>
          </View>
          <View></View>
          <TouchableOpacity onPress={handlePress} style={[styles.nextButton, error && {marginTop: 20}]}>
            <Text style={styles.buttonText} >
              Далее
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    //alignItems: 'center'
  },
  scrollViewContent: {
    //justifyContent: 'space-between'
  },
  otherPages: {
    //backgroundColor: 'white',
    alignItems: "center",
    width: '100%',
    justifyContent: 'flex-start',
    paddingVertical: windowHeight / 12,
    //paddingHorizontal: 24,
  },
  errorContainer: {
    borderRadius: 12,
    marginBottom: 20,
    //position: "absolute",
    //zIndex: 1,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#B01414'
  },
  errorText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: 'os-regular'
  },
  container: {
    width: "85%",
  },
  mainText: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: 'os-regular'
  },
  header: {
    textAlign: "center",
    //marginTop: 40,
    fontSize: 20,
    fontFamily: "os-bold",
    marginBottom: 20
  },
  inputBorder: {
    width: "50%",
    height: 42,
    marginTop: 0,
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "white",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  inputInner: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    textAlign: "center",
  },
  category: {
    //marginTop: 20,
    gap: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 40
  },
  option: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    height: 52,
    width: "100%",
    backgroundColor: "white",
    borderColor: "white",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: "#CCEDFF",
    borderColor: "#CCEDFF",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#233195",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRb: {
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: "#233195",
  },
  nextButton: {
    width: 164,
    height: 50,
    backgroundColor: "#233195",
    borderRadius: 12,
    marginTop: 40,
    justifyContent: "center",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "os-bold",
  },
  
});

export default OptionsScreen;