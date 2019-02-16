// @flow
import React from "react"
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#2a3f53",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
  },
})

const MainCategoryLabel = () => (
  <View style={styles.container}>
    <Text style={styles.label}>Main</Text>
  </View>
)

export default MainCategoryLabel
