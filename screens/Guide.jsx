import { Text, View, StyleSheet } from "react-native";
import StaticCell from "../components/StaticCell";
const Guide = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.whiteText}>
        You must find the right word in 6 steps. {"\n"}
        {"\n"}
        Fill in each row and check if you guessed the word correctly.
        {"\n"}
      </Text>

      <Text style={[styles.whiteText, styles.boldText]}>EXAMPLES {"\n"}</Text>
      <View style={styles.exampleWord}>
        <StaticCell value={"M"} backgroundColor="#F1930D"></StaticCell>
        <StaticCell value={"O"} backgroundColor="#F1930D"></StaticCell>
        <StaticCell value={"U"} backgroundColor="#6860A2"></StaticCell>
        <StaticCell value={"S"} backgroundColor="#3C373D"></StaticCell>
        <StaticCell value={"E"} backgroundColor="#F1930D"></StaticCell>
      </View>

      <View style={styles.exampleText}>
        <Text style={[styles.whiteText, styles.exampleTextBody]}>
          M,O,E are in the word and are in the right place. {"\n"}U is in the
          word but is in the wrong place. {"\n"}S is not in the word. {"\n"}
        </Text>
      </View>

      <View style={styles.exampleWord}>
        <StaticCell value={"M"} backgroundColor="#3C373D"></StaticCell>
        <StaticCell value={"O"} backgroundColor="#3C373D"></StaticCell>
        <StaticCell value={"V"} backgroundColor="#3C373D"></StaticCell>
        <StaticCell value={"I"} backgroundColor="#3C373D"></StaticCell>
        <StaticCell value={"E"} backgroundColor="#3C373D"></StaticCell>
      </View>
      <View style={styles.exampleText}>
        <Text style={styles.whiteText}>No letter is in the word. {"\n"}</Text>
      </View>

      <View style={styles.exampleWord}>
        <StaticCell value={"N"} backgroundColor="#F1930D"></StaticCell>
        <StaticCell value={"I"} backgroundColor="#F1930D"></StaticCell>
        <StaticCell value={"N"} backgroundColor="#F1930D"></StaticCell>
        <StaticCell value={"J"} backgroundColor="#F1930D"></StaticCell>
        <StaticCell value={"A"} backgroundColor="#F1930D"></StaticCell>
      </View>
      <View style={styles.exampleText}>
        <Text style={styles.whiteText}>
          All letters are in the word and in correct place. {"\n"}
        </Text>
      </View>

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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#0D1860",
    minHeight: "100%",
  },
  outro: {
    backgroundColor: "#192585",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  outroText: {
    color: "white",
    textAlign: "left",
  },
  whiteText: {
    color: "white",
  },
  boldText: {
    fontWeight: "bold",
  },
  exampleText: {
    marginTop: 20,
    lineHeight: 30,
  },
  exampleWord: {
    flexDirection: "row",
  },
  exampleTextBody: {
    lineHeight: 20,
  },
});

export default Guide;
