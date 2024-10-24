import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
} from "react-native";

export default function App() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [splitBy, setSplitBy] = useState(1);
  const [totalAmount, setTotalAmount] = useState(null);
  const [amountPerPerson, setAmountPerPerson] = useState(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = (bill * tipPercentage) / 100;
    const total = bill + tip;
    const perPerson = total / splitBy;

    setTotalAmount(total.toFixed(2));
    setAmountPerPerson(perPerson.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tip Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter bill amount"
        keyboardType="numeric"
        onChangeText={(text) => setBillAmount(text)}
        value={billAmount}
      />

      <Text style={styles.label}>Tip Percentage</Text>
      <Picker
        selectedValue={tipPercentage}
        style={styles.picker}
        onValueChange={(itemValue) => setTipPercentage(itemValue)}
      >
        <Picker.Item label="10%" value={10} />
        <Picker.Item label="15%" value={15} />
        <Picker.Item label="20%" value={20} />
      </Picker>

      <Text style={styles.label}>Split By (Number of People)</Text>
      <TextInput
        style={styles.input}
        placeholder="1"
        keyboardType="numeric"
        onChangeText={(text) => setSplitBy(Number(text))}
        value={splitBy.toString()}
      />

      <Button title="Calculate" onPress={calculateTip} />

      {totalAmount && (
        <View style={styles.result}>
          <Text>Total Amount: ${totalAmount}</Text>
          <Text>Amount per Person: ${amountPerPerson}</Text>
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
});
