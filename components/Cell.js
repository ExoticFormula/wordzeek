import { StyleSheet, TextInput, ToastAndroid, View } from "react-native";
import { useState } from "react";

const Cell = ({ setFilled, index, innerRef, cellRefs, rowFilled }) => {
  const [value, setValue] = useState("");

  return (
    <View>
      <TextInput
        editable={!rowFilled}
        selectTextOnFocus={!rowFilled}
        maxLength={1}
        ref={innerRef}
        style={styles.cell}
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
    backgroundColor: "#00695C",
    textAlign: "center",

    // backgroundColor: "#6A9948",
    borderRadius: 50,
    marginHorizontal: 2,
  },
});
export default Cell;
