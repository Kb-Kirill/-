import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import loadFonts from "./assets/fonts/fonts.js";

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [error, setError] = useState(null); // Добавляем состояние для ошибки

  useEffect(() => {
    const loadApp = async () => {
      try {
        await loadFonts(); // Вызываем функцию loadFonts
        setFontsLoaded(true); // Устанавливаем состояние загрузки шрифтов в true
      } catch (error) {
        setError(error); // Устанавливаем состояние ошибки
      }
    };

    loadApp();
  }, []);

  if (error) {
    return <View>{error.message}</View>; // Отображаем сообщение об ошибке
  }

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AppNavigator /> // Рендерим ваш навигатор после загрузки шрифтов
  );
};

export default App;
/*export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Hide the native splash screen when component mounts
    SplashScreen.hideAsync();

    // Load fonts when component mounts
    const loadAsyncData = async () => {
      await loadFonts();
      setFontLoaded(true);
    };

    loadAsyncData();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return <MainStack />;
}
*/
