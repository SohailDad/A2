import React, { useState, useRef } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Start the stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // Update every second
    }
  };

  // Stop the stopwatch
  const stopStopwatch = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  // Format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={startStopwatch} title="Start" />
        <Button onPress={stopStopwatch} title="Stop" />
        <Button onPress={resetStopwatch} title="Reset" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default Stopwatch;
