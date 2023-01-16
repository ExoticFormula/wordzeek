import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import Row from "../components/Row";
import axios from "axios";
import { createContext } from "react";
import { Audio } from "expo-av";
import { GlobalContext } from "../App";
const WordleContext = createContext();

const Game = ({ navigation }) => {
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [word, setWord] = useState("");
  const data = useContext(GlobalContext);
  const backupWords = ["pearl", "music", "movie"];
  useEffect(() => {
    axios
      .get("https://random-word-api.herokuapp.com/word?length=5")
      .then(({ data }) => {
        setWord(data[0]);
        console.log(data[0]);
      })
      .catch(() => {
        setWord(backupWords[Math.floor(Math.random() * 4)]);
      });
  }, []);

  return (
    <WordleContext.Provider value={{ word, activeRowIndex, setActiveRowIndex }}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>WORDZEEK</Text>
          <View style={styles.grid}>
            {[...Array(6)].map((_, index) => {
              return (
                <Row
                  key={index}
                  activeRowIndex={activeRowIndex}
                  rowNo={index}
                  setActiveRowIndex={setActiveRowIndex}
                ></Row>
              );
            })}
          </View>
        </View>
      </View>
    </WordleContext.Provider>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: "#251F26",
    backgroundColor: "#0D1860",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    paddingHorizontal: -2,
  },
  title: {
    fontSize: 35,
    color: "#F1930D",
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
  },
  grid: {
    marginTop: 25,
  },
});

export default Game;
export { WordleContext };
