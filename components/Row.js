import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import Cell from "./Cell";

const Row = ({ rowNo, activeRowIndex, setActiveRowIndex }) => {
  useEffect(() => {
    if (rowNo === activeRowIndex) cellRefs[0].current.focus();
  }, [activeRowIndex]);
  const showToast = () => {
    ToastAndroid.show("Row filled !", ToastAndroid.SHORT);
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
    },
    {
      index: 1,
      filled: false,
    },
    {
      index: 2,
      filled: false,
    },
    {
      index: 3,
      filled: false,
    },
    {
      index: 4,
      filled: false,
    },
  ]);

  useEffect(() => {
    const rowFilled = cellStates.every((cell) => cell.filled);

    if (rowFilled) {
      setRowFilled(true);
      //   showToast("Row filled");
      setActiveRowIndex(rowNo + 1);
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
      {[...Array(5)].map((_, index) => {
        return (
          <Cell
            rowFilled={rowFilled}
            innerRef={cellRefs[index]}
            cellRefs={cellRefs}
            setFilled={setFilled}
            key={index}
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
