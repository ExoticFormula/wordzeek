import { StyleSheet, Text, View } from "react-native";

const Cell = () => {
  return <View style={styles.cell}></View>;
};
const styles = StyleSheet.create({
  cell: {
    height: 60,
    width: 60,
    backgroundColor: "#6A9948",
    borderRadius: 50,
    marginHorizontal: 2,
  
  },
});
export default Cell;
