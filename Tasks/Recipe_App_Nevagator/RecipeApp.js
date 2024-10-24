//npm install @react-navigation/native
//npm install @react-navigation/stack
//npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Task10_nevagator/HomeScreen";
import DetailScreen from "./Task10_nevagator/DetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Recipes" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{ title: "Recipe Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
