import { useEffect, useState, useRef, } from "react";
import { StyleSheet, View,  ToastAndroid } from "react-native";
import Cell from "./Cell";

const Row = ({ rowNo,activeRowIndex,setActiveRowIndex,word }) => {
  const [cellStates, setCellStates] = useState([
    {
      index: 0,
      filled: false,
      color: "#5A6493",
    },
    {
      index: 1,
      filled: false,
      color: "#5A6493",
    },
    {
      index: 2,
      filled: false,
      color: "#5A6493",
    },
    {
      index: 3,
      filled: false,
      color: "#5A6493",
    },
    {
      index: 4,
      filled: false,
      color: "#5A6493",
    },
  ]);
  const [currentWord, setCurrentWord] = useState(null);
  const [rowFilled, setRowFilled] = useState(false);

  const cellRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];


  // jumping to next row not wokring as expected
  // useEffect(() => {
  //   if (rowNo === activeRowIndex) cellRefs[0].current.focus();
  // }, [activeRowIndex]);

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const updateCellColor = (newColors) => {
    const updatedCellStates = cellStates.map((cell, index) => {
      return { ...cell, color: newColors[index] };
    });
    setCellStates(updatedCellStates);
  };

  const compareWords = (currentWord) => {
    const newColors = [];

    for (let i = 0; i <= 4; i++) {
      if (currentWord[i] === word[i]) {
        newColors.push("#F1930D");
      } else if (word.includes(currentWord[i])) {
        newColors.push("#6860A2");
      } else newColors.push("#3C373D");

      const isCorrect = newColors.every((color) => color === "#F1930D");
      if (isCorrect) showToast("You Won!");
      updateCellColor(newColors);
    }
  };

  useEffect(() => {
    if (!rowFilled) {
      const rowFilled = cellStates.every((cell) => cell.filled);

      if (rowFilled) {
        setRowFilled(true);
        setActiveRowIndex(rowNo + 1);
        let word = "";
        setCurrentWord(word);

        cellRefs.forEach((cellRef) => {
          word += cellRef.current.value;
        });

        compareWords(word.toLowerCase());
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
      {cellStates.map((cell, index) => {
        return (
          <Cell
            rowFilled={rowFilled}
            activeRowIndex={activeRowIndex}
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
