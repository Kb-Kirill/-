import * as Font from "expo-font";

const loadFonts = async () => {
  await Font.loadAsync({
    "os-bold": require("./OpenSans-Bold.ttf"),
    "os-regular": require("./OpenSans-Regular.ttf"),
    "os-extrabold": require("./OpenSans-ExtraBold.ttf"),
  });
};

export default loadFonts;
