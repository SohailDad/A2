import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker } from 'react-native';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [conversionType, setConversionType] = useState('length');
  const [result, setResult] = useState(null);

  const conversionRates = {
    length: {
      meters: { feet: 3.28084, inches: 39.3701 },
      feet: { meters: 0.3048, inches: 12 },
      inches: { meters: 0.0254, feet: 0.08333 }
    },
    weight: {
      kilograms: { pounds: 2.20462 },
      pounds: { kilograms: 0.453592 }
    },
    temperature: {
      celsius: { fahrenheit: (value) => (value * 9/5) + 32 },
      fahrenheit: { celsius: (value) => (value - 32) * 5/9 }
    }
  };

  const getUnits = () => {
    switch (conversionType) {
      case 'length':
        return ['meters', 'feet', 'inches'];
      case 'weight':
        return ['kilograms', 'pounds'];
      case 'temperature':
        return ['celsius', 'fahrenheit'];
      default:
        return [];
    }
  };

  const convertUnit = () => {
    const input = parseFloat(inputValue);
    let result;

    if (conversionType === 'temperature') {
      result = conversionRates.temperature[fromUnit][toUnit](input);
    } else {
      const rate = conversionRates[conversionType][fromUnit][toUnit];
      result = input * rate;
    }

    setResult(result.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>

      <Text style={styles.label}>Conversion Type</Text>
      <Picker
        selectedValue={conversionType}
        style={styles.picker}
        onValueChange={(itemValue) => setConversionType(itemValue)}
      >
        <Picker.Item label="Length" value="length" />
        <Picker.Item label="Weight" value="weight" />
        <Picker.Item label="Temperature" value="temperature" />
      </Picker>

      <Text style={styles.label}>From</Text>
      <Picker
        selectedValue={fromUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setFromUnit(itemValue)}
      >
        {getUnits().map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      <Text style={styles.label}>To</Text>
      <Picker
        selectedValue={toUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setToUnit(itemValue)}
      >
        {getUnits().map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        onChangeText={text => setInputValue(text)}
        value={inputValue}
      />

      <Button title="Convert" onPress={convertUnit} />

      {result && (
        <View style={styles.result}>
          <Text>Converted Value: {result}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 20,
    borderRadius: 8,
    textAlign: 'center',
  },
  picker: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
});
