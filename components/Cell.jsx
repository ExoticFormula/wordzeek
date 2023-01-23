import { StyleSheet, TextInput, View} from "react-native";
import { useState } from "react";
const Cell = ({
  setFilled,
  cellIndex,
  innerRef,
  rowFilled,
  rowIndex,
  color,
  activeRowIndex,
  focusCell,
  gameState,
}) => {
  const [value, setValue] = useState("");

  return (
    <View>
      <TextInput
        editable={
          !rowFilled && rowIndex === activeRowIndex && gameState === "ONGOING"
        }
        selectTextOnFocus={
          !rowFilled && rowIndex === activeRowIndex && gameState === "ONGOING"
        }
        maxLength={1}
        ref={innerRef}
        style={{ ...styles.cell, backgroundColor: color }}
        value={value}
        onChangeText={(text) => {
          if (innerRef.current) innerRef.current.value = text;

          if (text && text.length > 0) {
            setFilled(rowIndex, cellIndex, true);
            if (cellIndex < 4) focusCell(cellIndex + 1);
          } else {
            setFilled(rowIndex, cellIndex, false);
            if (cellIndex > 0 && cellIndex < 4) focusCell(cellIndex - 1);
          }
          setValue(text.toUpperCase());
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            setValue("");
            if (cellIndex > 0 && cellIndex < 5) focusCell(cellIndex - 1);
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cell: {
    height: 80,
    width: 80,
    color: "white",
    borderRadius: 8,
    textAlign: "center",
    marginHorizontal: 2,
    outlineStyle: "white",
  },
});
export default Cell;
