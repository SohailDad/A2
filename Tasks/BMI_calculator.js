import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiMessage, setBmiMessage] = useState("");

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100; // convert height to meters
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);

    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setBmiMessage("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBmiMessage("Normal");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setBmiMessage("Overweight");
    } else {
      setBmiMessage("Obese");
    }
  };

  const clearInputs = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setBmiMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter weight in kg"
        keyboardType="numeric"
        onChangeText={(text) => setWeight(text)}
        value={weight}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter height in cm"
        keyboardType="numeric"
        onChangeText={(text) => setHeight(text)}
        value={height}
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {bmi && (
        <View style={styles.result}>
          <Text>Your BMI: {bmi}</Text>
          <Text>{bmiMessage}</Text>
        </View>
      )}

      <Button title="Clear" onPress={clearInputs} color="red" />
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
  result: {
    marginTop: 20,
    alignItems: "center",
  },
});
