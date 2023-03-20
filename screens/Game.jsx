import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Row from "../components/Row";
import initialState from "../utils/initialState";

const Game = ({ navigation }) => {
  const [gameState, setGameState] = useState("ONGOING");
  const [rowStates, setRowStates] = useState(
    initialState.getInitialRowStates()
  );
  const [title, setTitle] = useState("WORDZEEK");
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [word, setWord] = useState("");
  const backupWords = ["pearl", "music", "movie"];
  const [loading, setLoading] = useState(false);
  const cellRefs = useRef(initialState.getInitialRef());

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Current progress will be lost! go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate("Lobby") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getWord(5);
  }, []);

  useEffect(() => {
    const gameWon = rowStates.some((rowState) => rowState.solved);
    if (gameWon) {
      setTitle("YOU WON!");
      setGameState("WON");
      return;
    } else {
      const allRowsFilled = rowStates.every((rowState) => rowState.rowFilled);
      if (allRowsFilled && gameState !== "WON") {
        setTitle("YOU LOST :(");
        setGameState("LOST");
        return;
      }
    }
  }, [rowStates]);

  
  // jumping focus to next row first cell not working fix this.
  // useEffect(() => {
  //   console.log("hit");
  //   focusCell(activeRowIndex, 0);
  // }, [activeRowIndex]);

  const setSolved = (rowIndex) => {
    const updatedRowStates = [...rowStates];
    updatedRowStates[rowIndex].solved = true;
    setRowStates(updatedRowStates);
  };

  const getWord = (length) => {
    setLoading(true);
    axios
      .get(`https://random-word-api.herokuapp.com/word?length=${length}`)
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

  const setRowFilled = (rowIndex) => {
    const updatedRowStates = [...rowStates];
    updatedRowStates[rowIndex].rowFilled = true;
    setRowStates(updatedRowStates);
  };

  const setCellFilled = (rowIndex, cellIndex, filled) => {
    const updatedRowState = rowStates[rowIndex].rowState.map((cell) => {
      if (cellIndex === cell.index) return { ...cell, filled };
      return cell;
    });
    let updatedRowStates = [...rowStates];
    updatedRowStates[rowIndex].rowState = updatedRowState;
    setRowStates(updatedRowStates);
  };

  const setCellValue = (rowIndex, cellIndex, value) => {
    const updatedRowStates = [...rowStates];
    updatedRowStates[rowIndex].rowState[cellIndex].value = value;
    setRowStates(updatedRowStates);
  };

  const focusCell = (rowIndex, cellIndex) => {
    cellRefs.current[rowIndex][cellIndex].focus();
  };

  const updateCellColor = (rowIndex, newColors) => {
    const updatedRowState = rowStates[rowIndex].rowState.map((cell, index) => {
      return { ...cell, color: newColors[index] };
    });
    let updatedRowStates = [...rowStates];
    updatedRowStates[rowIndex].rowState = updatedRowState;
    setRowStates(updatedRowStates);
  };

  const resetGame = () => {
    setRowStates(initialState.getInitialRowStates());
    setGameState("ONGOING");
    setActiveRowIndex(0);
    getWord(5);
    cellRefs.current = initialState.getInitialRef();
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
                focusCell={focusCell}
                setActiveRowIndex={setActiveRowIndex}
                rowState={rowStates[index].rowState}
                updateCellColor={updateCellColor}
                setCellFilled={setCellFilled}
                rowFilled={rowStates[index].rowFilled}
                cellRefs={cellRefs}
                setRowFilled={setRowFilled}
                setSolved={setSolved}
                setCellValue={setCellValue}
                gameState={gameState}
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
