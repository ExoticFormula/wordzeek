import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import Row from "../components/Row";
import axios from "axios";
import { createContext } from "react";
const WordleContext = createContext();

const Game = () => {
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [word, setWord] = useState("");

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
    backgroundColor: "#251F26",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    gap: 5,
    paddingHorizontal: -2,
  },
  title: {
    fontSize: 35,
    color: "#fc4747",
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    alignItems: "center",
  },
});

export default Game;
export { WordleContext };
