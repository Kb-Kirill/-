import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function StartPage () {
  return (
    <View style = {styles.startPage}>
        <Text style = {styles.title}>Прогноз Я</Text>
        <TouchableOpacity style = {styles.startButton}>
            <Text style = {styles.buttonText}>Начать</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    startPage: {
        flex: 1,
        alignItems: 'center',
        backgroundImage: 'linear-gradient(#233195, #75beee)',
        width: '100%',
    },
    
    title: {
        fontSize: 48,
        marginTop: 335,
        textAlign: 'center',
        fontWeight: 900,
        color: '#ffffff',
    },
    startButton:{
        marginTop: 240,
        paddingTop: 19,
        width: 240,
        height: 60,
        backgroundColor: '#233195',
        borderRadius: 12,
        shadowColor: "#CCEDFF",
        shadowOffset: {
	        width: 0,
	        height: 0,
        },
        shadowRadius: 100,
    },
    buttonText:{
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});