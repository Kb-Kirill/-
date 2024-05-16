import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const OptionsScreen = () => {
  const [age, setAge] = useState('');
  const [selectedSubstance, setSelectedSubstance] = useState(null);
  const [selectedDependency, setSelectedDependency] = useState(null);
  const [error, setError] = useState('');

  const handleAgeChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '' || (parseInt(numericValue) >= 0 && parseInt(numericValue) <= 100)) {
      setAge(numericValue);
    }
  };

  const navigation = useNavigation();

  const handlePress = () => {
    if (!selectedSubstance || !selectedDependency || !age) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    navigation.navigate("Test");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.otherPages}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <View style={styles.container}>
            <View style={styles.category}>
              <Text style={styles.header}>Ваш возраст</Text>
              <View style={styles.inputBorder}>
                <TextInput 
                  style={styles.inputInner} 
                  keyboardType="numeric" 
                  value={age} 
                  onChangeText={handleAgeChange} 
                />
              </View>
            </View>
            <View style={styles.category}>
              <Text style={styles.header}>Тип вещества</Text>
              <Pressable 
                style={[styles.option, selectedSubstance === 'alcohol' && styles.selectedOption]} 
                onPress={() => setSelectedSubstance('alcohol')}
              >
                <View style={styles.radioCircle}>
                  {selectedSubstance === 'alcohol' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.mainText}>Алкоголь</Text>
              </Pressable>
              <Pressable 
                style={[styles.option, selectedSubstance === 'drugs' && styles.selectedOption]} 
                onPress={() => setSelectedSubstance('drugs')}
              >
                <View style={styles.radioCircle}>
                  {selectedSubstance === 'drugs' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.mainText}>Наркотики</Text>
              </Pressable>
              <Pressable 
                style={[styles.option, selectedSubstance === 'cigarettes' && styles.selectedOption]} 
                onPress={() => setSelectedSubstance('cigarettes')}
              >
                <View style={styles.radioCircle}>
                  {selectedSubstance === 'cigarettes' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.mainText}>Сигареты</Text>
              </Pressable>
            </View>
            <View style={styles.category}>
              <Text style={styles.header}>Степень зависимости</Text>
              <Pressable 
                style={[styles.option, selectedDependency === 'moderate' && styles.selectedOption]} 
                onPress={() => setSelectedDependency('moderate')}
              >
                <View style={styles.radioCircle}>
                  {selectedDependency === 'moderate' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.mainText}>Умеренная</Text>
              </Pressable>
              <Pressable 
                style={[styles.option, selectedDependency === 'severe' && styles.selectedOption]} 
                onPress={() => setSelectedDependency('severe')}
              >
                <View style={styles.radioCircle}>
                  {selectedDependency === 'severe' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.mainText}>Тяжёлая</Text>
              </Pressable>
            </View>
          </View>
          <TouchableOpacity style={[styles.nextButton, error && styles.ButtonWithPopUp]}>
            <Text style={styles.buttonText} onPress={handlePress}>Далее</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  otherPages: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 70,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    width: '100%',
    gap: 40,
  },
  mainText: {
    fontSize: 16,
    textAlign: 'left',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  inputBorder: {
    width: '30%',
    height: 42,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  inputInner: {
    width: '100%',
    height: '100%',
  },
  category: {
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  option: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 52,
    width: '100%',
  },
  selectedOption: {
    backgroundColor: '#CCEDFF',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#233195',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#233195',
  },
  nextButton: {
    paddingTop: 11,
    width: 164,
    height: 50,
    backgroundColor: '#233195',
    borderRadius: 12,
    top: 20,
  },
  ButtonWithPopUp: {
    top: 20,
  }
});

export default OptionsScreen;
