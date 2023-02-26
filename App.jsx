import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Text } from "react-native";
import { GlobalContext } from "./utils/GlobalContext";
import Lobby from "./screens/Lobby";
import Game from "./screens/Game";
import Guide from "./screens/Guide";

const Stack = createNativeStackNavigator();

const App = () => {
  const [musicOn, setMusicOn] = useState(false);
  const [sound, setSound] = useState();
  async function fetchAndPlaySound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/audios/game.mp3")
    );
    setSound(sound);

    await sound.playAsync();
    setMusicOn(true);
  }

  async function toggleSound() {
    if (musicOn) {
      await sound.pauseAsync();
      setMusicOn(false);
    } else {
      await sound.playAsync();
      setMusicOn(true);
    }
  }


  useEffect(() => {
    fetchAndPlaySound();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <GlobalContext.Provider
      value={{
        musicOn: musicOn,
        toggleSound: toggleSound,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackVisible: false,
          }}
        >
          <Stack.Screen
            name="Lobby"
            component={Lobby}
            options={{
              title: "Lobby",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#0D1860",
              },
            }}
          />

          <Stack.Screen
            name="Game"
            component={Game}
            options={({ navigation }) => ({
              title: "WORDZEEK",
              headerStyle: {
                backgroundColor: "#0D1860",
              },
              headerTintColor: "#FFF",
              headerTitle: () => (
                <Feather
                  name={musicOn ? "volume-x" : "volume-2"}
                  size={30}
                  color="white"
                  onPress={() => {
                    toggleSound();
                  }}
                />
              ),
              headerTintColor: "#FFF",
              headerRight: () => (
                <AntDesign
                  onPress={() => navigation.navigate("Guide")}
                  name="questioncircleo"
                  size={30}
                  color="white"
                />
              ),
            })}
          />

          <Stack.Screen
            name="Guide"
            component={Guide}
            options={({ navigation }) => ({
              title: "Guide",
              headerStyle: {
                backgroundColor: "#0D1860",
              },
              headerTitle: () => (
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  How to play wordzeek?
                </Text>
              ),
              headerTintColor: "#FFF",

              headerRight: () => (
                <AntDesign
                  name="closecircleo"
                  size={30}
                  color="white"
                  onPress={() => {
                    navigation.navigate("Game");
                  }}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};

export { GlobalContext };
export default App;
