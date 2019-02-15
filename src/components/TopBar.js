// @flow
import React from "react"
import { StyleSheet, View } from "react-native"

import { MonoText } from "./StyledText"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    backgroundColor: "#ddd",
  },
  title: {
    marginTop: 20,
    marginLeft: 10,
    textTransform: "uppercase",
    fontSize: 24,
    color: "#222",
  },
})

const TopBar = () => (
  <View style={styles.container}>
    <MonoText style={styles.title}>oEnergetice.cz</MonoText>
  </View>
)

export default TopBar
