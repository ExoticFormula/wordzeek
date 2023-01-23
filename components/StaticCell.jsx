import { StyleSheet, TextInput, View } from "react-native";

const StaticCell = ({ value, backgroundColor }) => {
  return (
    <View>
      <TextInput
        style={{ ...styles.cell, backgroundColor }}
        editable={false}
        selectTextOnFocus={false}
        value={value}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  cell: {
    height: 50,
    width: 50,
    color: "white",
    borderRadius: 8,
    textAlign: "center",
    marginHorizontal: 2,
    outlineStyle: "white",
  },
});
export default StaticCell;
