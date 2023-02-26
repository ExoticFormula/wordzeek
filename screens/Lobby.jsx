import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { GlobalContext } from "../utils/GlobalContext";

const EnterGame = ({ navigation }) => {
  const data = useContext(GlobalContext);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.wrapper}>
        <Feather
          style={styles.volumeIcon}
          name={data.musicOn ? "volume-x" : "volume-2"}
          size={35}
          color="white"
          onPress={() => {
            data.toggleSound();
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Game")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Enter Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "dodgerblue",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: "white",
  },
  volumeIcon: {
    position: "absolute",
    top: "10%",
    right: 40,
  },
});

export default EnterGame;
