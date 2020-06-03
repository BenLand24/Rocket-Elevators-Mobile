import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// You can import from local files
import Home from "./screen/homeIndex.js";
import ElevatorsList from "./screen/elevatorIndex.js";
import Status from "./screen/statusIndex.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="ElevatorsList"
          component={ElevatorsList}
          options={{ title: "Elevators List" }}
        />
        <Stack.Screen name="Status" component={Status} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
