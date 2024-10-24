import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Pedometer } from "expo-sensors"; //plz install expo-sensors
import * as Notifications from "expo-notifications"; //plz install expo-notifications

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [stepCount, setStepCount] = useState(0);
  const stepGoal = 10000; // Step goal for notifications

  useEffect(() => {
    const subscribePedometer = () => {
      Pedometer.isAvailableAsync().then(
        (result) => setIsPedometerAvailable(String(result)),
        (error) =>
          setIsPedometerAvailable(
            "Could not get isPedometerAvailable: " + error,
          ),
      );

      const subscription = Pedometer.watchStepCount((result) => {
        setStepCount(result.steps);
        if (result.steps >= stepGoal) {
          triggerNotification();
        }
      });

      return () => subscription && subscription.remove();
    };

    subscribePedometer();
    resetAtMidnight();

    return () => {
      Pedometer.stopObserving();
    };
  }, []);

  // Reset step count at midnight
  const resetAtMidnight = () => {
    const now = new Date();
    const timeUntilMidnight =
      (24 - now.getHours()) * 3600000 -
      now.getMinutes() * 60000 -
      now.getSeconds() * 1000;

    setTimeout(() => {
      setStepCount(0); // Reset step count at midnight
      resetAtMidnight(); // Re-call to set up the next midnight reset
    }, timeUntilMidnight);
  };

  // Send notification when step goal is reached
  const triggerNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Step Goal Reached!",
        body: `Congratulations! You've reached ${stepGoal} steps today.`,
      },
      trigger: null, // Send the notification immediately
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Step Counter</Text>
      <Text>Pedometer available: {isPedometerAvailable}</Text>
      <Text style={styles.stepText}>Steps: {stepCount}</Text>
      <Text>Step Goal: {stepGoal}</Text>
      <Button title="Reset Steps" onPress={() => setStepCount(0)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    marginBottom: 20,
  },
  stepText: {
    fontSize: 24,
    marginVertical: 20,
  },
});
