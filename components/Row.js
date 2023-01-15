import { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import Cell from "./Cell";
import { WordleContext } from "../App";
const Row = ({ rowNo }) => {
  const [currentWord, setCurrentWord] = useState(null);
  const data = useContext(WordleContext);
  const correctWord = data.word;
  const setActiveRowIndex = data.setActiveRowIndex;
  const activeRowIndex = data.activeRowIndex;
  useEffect(() => {
    if (rowNo === activeRowIndex) cellRefs[0].current.focus();
  }, [activeRowIndex]);

  const showToast = () => {
    ToastAndroid.show("Row filled !", ToastAndroid.SHORT);
  };

  const updateCellColor = (newColors) => {
    const updatedCellStates = cellStates.map((cell, index) => {
      return { ...cell, color: newColors[index] };
    });
    console.log(updatedCellStates);
    setCellStates(updatedCellStates);
  };

  const compareWords = (currentWord) => {
    const newColors = [];

    for (let i = 0; i <= 4; i++) {
      if (currentWord[i] === correctWord[i]) {
        newColors.push("#6A9948");
      } else if (correctWord.includes(currentWord[i])) {
        newColors.push("#6860A2");
      } else newColors.push("#3C373D");

      const isCorrect = newColors.every((color) => color === "#6A9948");
      if (isCorrect) console.log("You Won!");
      updateCellColor(newColors);
    }
  };
  const [rowFilled, setRowFilled] = useState(false);
  const cellRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [cellStates, setCellStates] = useState([
    {
      index: 0,
      filled: false,
      color: "#00695C",
    },
    {
      index: 1,
      filled: false,
      color: "#00695C",
    },
    {
      index: 2,
      filled: false,
      color: "#00695C",
    },
    {
      index: 3,
      filled: false,
      color: "#00695C",
    },
    {
      index: 4,
      filled: false,
      color: "#00695C",
    },
  ]);

  useEffect(() => {
    if (!rowFilled) {
      const rowFilled = cellStates.every((cell) => cell.filled);

      if (rowFilled) {
        setRowFilled(true);
        //   showToast("Row filled");
        setActiveRowIndex(rowNo + 1);
        let word = "";
        setCurrentWord(word);

        cellRefs.forEach((cellRef) => {
          word += cellRef.current.value;
        });
        compareWords(word);
      }
    }
  }, [cellStates]);
  const setFilled = (index, filled) => {
    const updatedCellStates = cellStates.map((cell) => {
      if (index === cell.index) return { ...cell, filled };
      return cell;
    });
    setCellStates([...updatedCellStates]);
  };
  return (
    <View style={styles.row}>
      <Text style={styles.rowNo}>{rowNo}</Text>
      {cellStates.map((cell, index) => {
        return (
          <Cell
            rowFilled={rowFilled}
            innerRef={cellRefs[index]}
            cellRefs={cellRefs}
            setFilled={setFilled}
            key={index}
            color={cell.color}
            index={index}
            rowNo={rowNo}
          ></Cell>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 5,
    gap: 5,
    paddingHorizontal: -2,
  },
  rowNo: {
    color: "#fc4747",
  },
});
export default Row;
