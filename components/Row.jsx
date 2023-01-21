import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import Cell from "./Cell";

const Row = ({
  rowState,
  rowIndex,
  activeRowIndex,
  setActiveRowIndex,
  word,
  updateCellColor,
  setFilled,
}) => {
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
  //   if (rowIndex === activeRowIndex) cellRefs[0].current.focus();
  // }, [activeRowIndex]);

  const focusCell = (refIndex) => {
    cellRefs[refIndex].current.focus();
  };

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const compareWords = (currentWord) => {
    const newColors = [];

    for (let i = 0; i <= 4; i++) {
      if (currentWord[i] === word[i]) {
        newColors.push("#F1930D");
      } else if (word.includes(currentWord[i])) {
        newColors.push("#6860A2");
      } else newColors.push("#3C373D");
    }

    const isCorrect = newColors.every((color) => color === "#F1930D");
    if (isCorrect) showToast("You Won!");
    updateCellColor(rowIndex, newColors);
  };

  useEffect(() => {
    if (!rowFilled) {
      const rowFilled = rowState.every((cell) => cell.filled);

      if (rowFilled) {
        setRowFilled(true);
        setActiveRowIndex(rowIndex + 1);
        let word = "";
        setCurrentWord(word);

        cellRefs.forEach((cellRef) => {
          word += cellRef.current.value;
        });

        compareWords(word.toLowerCase());
      }
    }
  }, [rowState]);

  return (
    <View style={styles.row}>
      {rowState.map((cell, index) => {
        return (
          <Cell
            rowFilled={rowFilled}
            activeRowIndex={activeRowIndex}
            innerRef={cellRefs[index]}
            focusCell={focusCell}
            setFilled={setFilled}
            key={index}
            color={cell.color}
            cellIndex={index}
            rowIndex={rowIndex}
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
  rowIndex: {
    color: "#fc4747",
  },
});

export default Row;
