import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "YOUR_API_KEY"; // Replace with your exchangeratesapi.io API key

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const getConversionRate = () => {
    fetch(
      `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}&apikey=${API_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[toCurrency];
        const result = (parseFloat(amount) * rate).toFixed(2);
        setConvertedAmount(result);
      })
      .catch((error) => {
        console.error("Error fetching conversion rate:", error);
      });
  };

  const saveFavorite = async () => {
    const pair = `${fromCurrency} to ${toCurrency}`;
    const newFavorites = [...favorites, pair];
    setFavorites(newFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const loadFavorites = async () => {
    const savedFavorites = await AsyncStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
        value={amount}
      />

      <Text style={styles.label}>From</Text>
      <Picker
        selectedValue={fromCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setFromCurrency(itemValue)}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="GBP" value="GBP" />
        {/* Add more currencies as needed */}
      </Picker>

      <Text style={styles.label}>To</Text>
      <Picker
        selectedValue={toCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setToCurrency(itemValue)}
      >
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="GBP" value="GBP" />
        {/* Add more currencies as needed */}
      </Picker>

      <Button title="Convert" onPress={getConversionRate} />

      {convertedAmount && (
        <View style={styles.result}>
          <Text>
            Converted Amount: {convertedAmount} {toCurrency}
          </Text>
        </View>
      )}

      <Button title="Save as Favorite" onPress={saveFavorite} />

      <Text style={styles.label}>Favorite Currency Pairs:</Text>
      {favorites.length > 0 ? (
        favorites.map((pair, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              const [from, to] = pair.split(" to ");
              setFromCurrency(from);
              setToCurrency(to);
            }}
          >
            <Text style={styles.favorite}>{pair}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No favorites saved</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
  picker: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  result: {
    marginTop: 20,
    alignItems: "center",
  },
  favorite: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#d3d3d3",
    marginTop: 10,
    width: "80%",
    textAlign: "center",
    borderRadius: 8,
  },
});
