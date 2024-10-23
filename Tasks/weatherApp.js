import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";

const API_KEY = "Key";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        onChangeText={(text) => setCity(text)}
        value={city}
      />
      <Button title="Search" onPress={getWeather} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.temperature}>
            Temperature: {weatherData.main.temp}°C
          </Text>
          <Text style={styles.humidity}>
            Humidity: {weatherData.main.humidity}%
          </Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 20,
    borderRadius: 8,
    textAlign: "center",
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  cityName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 18,
  },
  humidity: {
    fontSize: 18,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
