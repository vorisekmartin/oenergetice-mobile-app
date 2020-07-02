// @flow
import React from "react"
import { StyleSheet } from "react-native"
import { MonoText } from "../StyledText"

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 26,
  },
})

const Heading = ({ title, onLongPress }) => (
  <MonoText onLongPress={onLongPress} style={styles.title}>
    {title}
  </MonoText>
)

export default Heading
