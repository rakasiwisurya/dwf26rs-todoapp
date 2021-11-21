import React from "react";

//Import Navigation Container
import { NavigationContainer } from "@react-navigation/native";

// Import Stack Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Import Theme Native Base
import { useTheme } from "native-base";

// Import Screen
import Home from "./src/screens/Home";
import DetailTodo from "./src/screens/DetailTodo";
import UpdateTodo from "./src/screens/UpdateTodo";

// Create Stack Navigation
const Stack = createStackNavigator();

export default function Container() {
  // Init Theme
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: theme.colors.primary["500"] },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Todo App",
          }}
        />
        <Stack.Screen
          name="DetailTodo"
          component={DetailTodo}
          options={{
            title: "Detail Todo",
          }}
        />
        <Stack.Screen
          name="UpdateTodo"
          component={UpdateTodo}
          options={{
            title: "Edit Todo",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
