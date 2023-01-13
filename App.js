import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Cell from "./components/Cell";
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WORDZEEK</Text>
      <View>

      <View style={styles.row}>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>

        <Cell></Cell>

        <Cell></Cell>
      </View>

      <View style={styles.row}>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>

        <Cell></Cell>

      </View>

      <View style={styles.row}>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>

        <Cell></Cell>

      </View>

      <View style={styles.row}>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>

        <Cell></Cell>
      </View>

      <View style={styles.row}>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>

        <Cell></Cell>

      </View>

      <View style={styles.row}>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>

        <Cell></Cell>

      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#251F26",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  row:{
    flexDirection:'row',
    marginTop:5,
    gap:5,
    paddingHorizontal:-2,
  },
  title:{
    fontSize:30,
    color:"#fc4747",
    fontWeight:"bold"
  }
});
