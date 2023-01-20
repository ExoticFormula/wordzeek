import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
const Cell = ({
  setFilled,
  index,
  innerRef,
  rowFilled,
  rowNo,
  color,
  activeRowIndex,
  focusCell,
}) => {
  const [value, setValue] = useState("");

  return (
    <View>
      <TextInput
        editable={!rowFilled && rowNo === activeRowIndex}
        selectTextOnFocus={!rowFilled && rowNo === activeRowIndex}
        maxLength={1}
        ref={innerRef}
        style={{ ...styles.cell, backgroundColor: color }}
        value={value}
        onChangeText={(text) => {
          if (innerRef.current) innerRef.current.value = text;

          if (text && text.length > 0) {
            setFilled(rowNo, index, true);

            if (index < 4) focusCell(index + 1);
          } else {
            setFilled(rowNo, index, false);
            if (index > 0 && index < 4) focusCell(index - 1);
          }
          setValue(text.toUpperCase());
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            setValue("");
            if (index > 0 && index < 5) focusCell(index - 1);
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
