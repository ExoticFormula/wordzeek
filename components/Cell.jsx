import { StyleSheet, TextInput, View } from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

const Cell = ({
  setCellFilled,
  cellIndex,
  innerRef,
  rowFilled,
  rowIndex,
  color,
  activeRowIndex,
  focusCell,
  gameState,
  value,
  setCellValue,
}) => {
  const [inputSound, setInputSound] = useState(null);
  const [editable, setEditable] = useState(false);
  async function fetchSounds() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audios/input.mp3")
    );
    setInputSound(sound);
  }
  async function playSound(sound) {
    await sound.pauseAsync();
    await sound.playAsync();
  }
  useEffect(() => {
    fetchSounds();
  }, []);
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
        onChangeText={async (text) => {
          playSound(inputSound);
          if (innerRef.current) innerRef.current.value = text;

          if (text && text.length > 0) {
            setCellFilled(rowIndex, cellIndex, true);
            if (cellIndex < 4) focusCell(rowIndex,cellIndex + 1);
          } else {
            setCellFilled(rowIndex, cellIndex, false);
            if (cellIndex > 0 && cellIndex < 4) focusCell(rowIndex,cellIndex - 1);
          }
          setCellValue(rowIndex, cellIndex, text.toUpperCase);
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            setCellValue(rowIndex, cellIndex, "");
            if (cellIndex > 0 && cellIndex < 5) focusCell(rowIndex,cellIndex - 1);
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
