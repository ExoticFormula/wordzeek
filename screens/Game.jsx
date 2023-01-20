import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Row from "../components/Row";
import initialRowStates from "../utils/initialRowStates";
import axios from "axios";

const Game = ({ navigation }) => {
  const [rowStates, setRowStates] = useState(initialRowStates);
  const [title, setTitle] = useState("WORDZEEK");
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [word, setWord] = useState("");
  const backupWords = ["pearl", "music", "movie"];

  const updateCellColor = (rowNo, newColors) => {
    const updatedRowState = rowStates[rowNo].map((cell, index) => {
      return { ...cell, color: newColors[index] };
    });
    let updatedRowStates = [...rowStates];
    updatedRowStates[rowNo] = updatedRowState;
    setRowStates(updatedRowStates);
  };

  const setFilled = (rowNo, index, filled) => {
    const updatedRowState = rowStates[rowNo].map((cell) => {
      if (index === cell.index) return { ...cell, filled };
      return cell;
    });
    let updatedRowStates = [...rowStates];
    updatedRowStates[rowNo] = updatedRowState;
    setRowStates(updatedRowStates);
  };

  useEffect(() => {
    axios
      .get("https://random-word-api.herokuapp.com/word?length=5")
      .then(({ data }) => {
        setWord(data[0]);

        //for now
        setTitle(data[0]);
      })
      .catch(() => {
        setWord(backupWords[Math.floor(Math.random() * 4)]);
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.grid}>
          {[...Array(6)].map((_, index) => {
            return (
              <Row
                key={index}
                word={word}
                activeRowIndex={activeRowIndex}
                rowNo={index}
                setActiveRowIndex={setActiveRowIndex}
                rowState={rowStates[index]}
                updateCellColor={updateCellColor}
                setFilled={setFilled}
              ></Row>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0D1860",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    alignItems: "center",
  },
  grid: {
    marginTop: 25,
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
});

export default Game;
