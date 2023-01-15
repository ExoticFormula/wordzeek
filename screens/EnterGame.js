import { Button } from "react-native";
import { StyleSheet, View } from "react-native";

const EnterGame = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("Game")}
        title="Enter Game"
      ></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#251F26",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default EnterGame;
