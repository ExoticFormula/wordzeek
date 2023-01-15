import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnterGame from "./screens/EnterGame";
import Game from "./screens/Game";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Enter Game"
          component={EnterGame}
          options={{ title: "Enter Game" }}
        />

        <Stack.Screen
          name="Game"
          component={Game}
          options={{ title: "WordZeek" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
