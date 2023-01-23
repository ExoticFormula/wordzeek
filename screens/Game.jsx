import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ToastAndroid } from "react-native";
import Row from "../components/Row";
import initialRowStates from "../utils/initialRowStates";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

const Game = () => {
  const [gameState, setGameState] = useState("ONGOING");
  const [rowStates, setRowStates] = useState(initialRowStates);
  const [title, setTitle] = useState("WORDZEEK");
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [word, setWord] = useState("");
  const backupWords = ["pearl", "music", "movie"];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWord();
  }, []);

  useEffect(() => {
    const gameLost = rowStates.every((rowState) => rowState.rowFilled);
    console.log(gameLost);
  }, [rowStates]);

  const getWord = () => {
    setLoading(true);
    axios
      .get("https://random-word-api.herokuapp.com/word?length=5")
      .then(({ data }) => {
        setWord(data[0]);
        //for now
        setTitle(data[0]);
        setLoading(false);
      })
      .catch(() => {
        setWord(backupWords[Math.floor(Math.random() * 4)]);
        setLoading(false);
      });
  };
  const updateCellColor = (rowIndex, newColors) => {
    const updatedRowState = rowStates[rowIndex].rowState.map((cell, index) => {
      return { ...cell, color: newColors[index] };
    });
    let updatedRowStates = [...rowStates];
    updatedRowStates[rowIndex].rowState = updatedRowState;
    setRowStates(updatedRowStates);
  };

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const setRowFilled = (rowIndex) => {
    const updatedRowStates = [...rowStates];
    updatedRowStates[rowIndex].rowFilled = true;
    setRowStates(updatedRowStates);
  };

  const setFilled = (rowIndex, index, filled) => {
    const updatedRowState = rowStates[rowIndex].rowState.map((cell) => {
      if (index === cell.index) return { ...cell, filled };
      return cell;
    });
    let updatedRowStates = [...rowStates];
    updatedRowStates[rowIndex].rowState = updatedRowState;
    setRowStates(updatedRowStates);
  };

  const resetGame = () => {
    getWord();
    setRowStates([...initialRowStates]);
  };

  const checkGameState = () => {
    let gameLost = rowStates.forEach((rowState) => rowState.rowFilled);
    if (gameLost && !gameState === "WON") showToast("Game lost :(");
  };

  return (
    <View style={styles.wrapper}>
      <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.grid}>
          {[...Array(6)].map((_, index) => {
            return (
              <Row
                key={index}
                word={word}
                activeRowIndex={activeRowIndex}
                rowIndex={index}
                setActiveRowIndex={setActiveRowIndex}
                rowState={rowStates[index].rowState}
                updateCellColor={updateCellColor}
                setFilled={setFilled}
                showToast={showToast}
                checkGameState={checkGameState}
                setRowFilled={setRowFilled}
              ></Row>
            );
          })}
        </View>

        <MaterialCommunityIcons
          onPress={() => {
            resetGame();
          }}
          name="restart"
          size={60}
          color="white"
        />
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
    marginBottom: 25,
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
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default Game;
