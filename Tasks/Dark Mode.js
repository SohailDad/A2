import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  useColorScheme,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const systemColorScheme = useColorScheme(); // Detects system theme (light/dark)
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  // Load the theme preference from AsyncStorage when the app starts
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark");
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  };

  // Save the theme preference to AsyncStorage
  const saveTheme = async (theme) => {
    try {
      await AsyncStorage.setItem("theme", theme);
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    saveTheme(newTheme); // Persist the selected theme
  };

  useEffect(() => {
    loadTheme(); // Load saved theme preference when the app starts
  }, []);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        Dark Mode is {isDarkMode ? "On" : "Off"}
      </Text>

      {/* Manual toggle for dark mode */}
      <View style={styles.switchContainer}>
        <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>

      {/* Button Example */}
      <Button
        title="Example Button"
        color={isDarkMode ? "#fff" : "#000"}
        onPress={() => alert("Button Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
