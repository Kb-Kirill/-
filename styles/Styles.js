import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
export const styles = StyleSheet.create({
    // Containers
    gradient: {
      flex: 1,
    },
    container2: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: windowHeight / 12,
    },
    container1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    iconsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },

    // Shadow
    shadow: {
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },

    // Buttons
    homeButton:{
      backgroundColor: "#233195",
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 30,
      borderRadius: 12,
    },
    homeButtonContainer: {
      position: "absolute",
      bottom: 140,
      width: "65%",
      borderRadius: 12,
    },
    button: {
      width: 164,
      height: 50,
      backgroundColor: "#233195",
      borderRadius: 12,
      justifyContent: "center",
    },
    buttonText: {
      textAlign: "center",
      color: "#ffffff",
      fontSize: 16,
      fontFamily: "os-bold",
    },

    // Text
    title: {
      fontFamily: "os-extrabold",
      fontSize: 48,
      color: "#FFFFFF",
    },
    header: {
      textAlign: "center",
      fontSize: 20,
      fontFamily: "os-bold",
      marginBottom: 20,
    },
    mainText: {
      fontSize: 16,
      fontFamily: "os-regular",
    },
    errorText:{
      textAlign: "center",
      fontSize: 24,
      fontFamily: "os-bold",
      color: "#B01414",
    }, 
   
    // OptionsScreen
    field: {
      borderRadius: 12,
      paddingHorizontal: 15,
      backgroundColor: "white",
      alignItems: "center",
    },
    errorContainer: {
      borderRadius: 12,
      marginBottom: 20,
      marginTop: 0,
      padding: 10,
      backgroundColor: "#B01414",
    },
    ageInput:{
      width: "50%",
      height: 40,
    },
    inputInner: {
      width: "100%",
      height: "100%",
      fontSize: 16,
      textAlign: "center",
    },
    category: {
      gap: 10,
      alignItems: "center",
      width: "100%",
      marginBottom: 40,
    },
    option:{
      flexDirection: "row",
      height: 50,
      width: "100%",
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

    // Slider
    sliderContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: windowHeight / 14,
    },
    sliderLabelContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: 350,
    },
    sliderLabel: {
      textAlign: "center",
      width: 80,
      fontSize: 16,
      fontFamily: 'os-regular',
    },

    // AddPhotoScreen
    photoButton:{
      backgroundColor: "#CCEDFF",
      width: "45%",
      height: windowHeight / 6,
      padding: 20,
      justifyContent: "center",
      borderRadius: 12,
    },
    nextButtonContainer: {
      width: "100%",
      justifyContent: "flex-end",
      height: windowHeight / 2.6,
    },
    icon: {
      alignSelf: "center",
      fontSize: 40,
    },

    // CheckPhotoScreen
    checkPhotoButtonContainer: {
      flex: 1, 
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "#0E164B",
    },

    // LoadingPhotoScreen
    dotsContainer: {
      flexDirection: "row",
      marginBottom: 20,
      alignItems: "center",
    },
    dot: {
      width: 20,
      height: 20,
      borderRadius: 15,
      backgroundColor: "#B3E5FC",
      marginHorizontal: 10,
    },
    activeDot: {
      backgroundColor: "#303F9F",
    },
    loadingText: {
      fontSize: 18,
      fontFamily: "os-regular",
      marginBottom: 5,
      textAlign: "center",
      color: "white",
    },
    imageContainer1: {
      width: "100%",
      height: "85%", 
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#080C27",
    },

    // FinalScreen
    imageContainer2: {
      width: "85%",
      height: "65%",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    iconButton: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: "#F0F0F0",
    },
})