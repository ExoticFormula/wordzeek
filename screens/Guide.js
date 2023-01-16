import { Text, View, StyleSheet } from "react-native";
import Cell from "../components/Cell";
const Guide = () => {
  return (
    <View>
      <Text>You must find the right word in 6 steps</Text>
      <View style={styles.outro}>
        <Text style={styles.outroText}>
          Wordzeek will be waiting for you with new words everyday !
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  outro: {
    backgroundColor: "#192585",
  },
  outroText: {
    color: "white",
  },
});

export default Guide;
