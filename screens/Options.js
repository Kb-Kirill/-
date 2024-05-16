import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Options () {
  return (
    <View style = {styles.otherPages}>
      <View style = {{width: '100%', gap: 40}}>
        <View style = {styles.category}>
          <Text style = {styles.header}>Ваш возраст</Text>
          <View style = {styles.inputBorder}>
            <TextInput style = {styles.inputInner}></TextInput>
          </View>
        </View>
        <View style = {styles.category}>
          <Text style = {styles.header}>Тип вещества</Text>
          <View style = {styles.option}>
            <Image source = {require('../assets/icons/unselected.png')}></Image>
            <Text style = {styles.mainText}>Алкоголь</Text>
          </View>
          <View style = {styles.option}>
            <Image source = {require('../assets/icons/unselected.png')}></Image>
            <Text style = {styles.mainText}>Наркотики</Text>
          </View>
          <View style = {styles.option}>
            <Image source = {require('../assets/icons/unselected.png')}></Image>
            <Text style = {styles.mainText}>Сигареты</Text>
          </View>
        </View>
        <View style = {styles.category}>
          <Text style = {styles.header}>Степень зависимости</Text>
          <View style = {styles.option}>
            <Image source = {require('../assets/icons/unselected.png')}></Image>
            <Text style = {styles.mainText}>Умеренная</Text>
          </View>
          <View style = {styles.option}>
            <Image source = {require('../assets/icons/unselected.png')}></Image>
            <Text style = {styles.mainText}>Тяжёлая</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton}>
        <Text style = {styles.buttonText}>Далее</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

    otherPages: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingVertical: 70,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
    },
    mainText:{
        fontSize: 16,
    },
    buttonText:{
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    header:{
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 20,
        marginBottom: 20,
    },
    inputBorder:{
        width: 180,
        height: 42,
        borderRadius: 12,
        borderColor: 'black',
        borderWidth: 1,
    },
    inputInner:{
        width: '100%', 
        height: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    category:{
        gap: 10,
        alignItems: 'center',
        width: '100%',
    },
    option:{
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        padding: 15,
        height: 52,
        width: '100%',
    },
    nextButton:{
        paddingTop: 11,
        width: 164,
        height: 50,
        backgroundColor: '#233195',
        borderRadius: 12,
    },
});