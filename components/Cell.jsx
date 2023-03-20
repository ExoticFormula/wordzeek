import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Cell = ({
  setCellFilled,
  cellIndex,
  rowFilled,
  rowIndex,
  color,
  activeRowIndex,
  focusCell,
  gameState,
  value,
  setCellValue,
  cellRefs,
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
        ref={(ref) => {
          if (ref && !cellRefs.current[rowIndex].includes(ref))
            cellRefs.current[rowIndex].push(ref);
        }}
        style={{ ...styles.cell, backgroundColor: color }}
        value={value}
        onChangeText={async (text) => {
          playSound(inputSound);
          if (cellRefs.current[rowIndex][cellIndex])
            cellRefs.current[rowIndex][cellIndex].value = text;

          if (text && text.length > 0) {
            setCellFilled(rowIndex, cellIndex, true);
            if (cellIndex < 4) focusCell(rowIndex, cellIndex + 1);

          } 
          setCellValue(rowIndex, cellIndex, text.toUpperCase);
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Backspace") {
            setCellFilled(rowIndex, cellIndex, false);

            setCellValue(rowIndex, cellIndex, "");
            if (cellIndex > 0 && cellIndex < 5)
              focusCell(rowIndex, cellIndex - 1);
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
