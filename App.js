import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Row from "./components/Row";
export default function App() {
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const triggerNewRow = (rowIndex) => {};
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>WORDZEEK</Text>
        <View style={styles.grid}>
          {[...Array(6)].map((_, index) => {
            return (
              <Row
                key={index}
                activeRowIndex={activeRowIndex}
                rowNo={index + 1}
                setActiveRowIndex={setActiveRowIndex}
              ></Row>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#251F26",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    gap: 5,
    paddingHorizontal: -2,
  },
  title: {
    fontSize: 35,
    color: "#fc4747",
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    alignItems: "center",
  },
});
