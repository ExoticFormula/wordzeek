import { StyleSheet, TextInput, ToastAndroid, View } from "react-native";
import { useState, useContext } from "react";
import { WordleContext } from "../App";

const Cell = ({
  setFilled,
  index,
  innerRef,
  cellRefs,
  rowFilled,
  rowNo,
  color,
}) => {
  const [value, setValue] = useState("");
  const data = useContext(WordleContext);
  const activeRowIndex = data.activeRowIndex;
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
          if (text && text.length > 0) {
            setFilled(index, true);
            if (index < 4) cellRefs[index + 1].current.focus();
          } else {
            setFilled(index, false);
            if (index > 0 && index < 4) cellRefs[index - 1].current.focus();
          }
          setValue(text);
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            if (index > 0 && index < 5) cellRefs[index - 1].current.focus();
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cell: {
    height: 60,
    outlineStyle: "none",
    color: "white",
    width: 60,
    textAlign: "center",


    borderRadius: 50,
    marginHorizontal: 2,
  },
});
export default Cell;
