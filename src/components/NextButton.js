// @flow
import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { MonoText } from "./StyledText"

const styles = StyleSheet.create({
  nextButton: {
    textAlign: "center",
    backgroundColor: "#2a3f53",
    maxHeight: 44,
    borderRadius: 5,
    alignItems: "center",
  },
  nextButtonText: {
    margin: 5,
    color: "#eee",
  },
})

const NextButton = ({ handlePressNext, style, title = "Next" }) => (
  <TouchableOpacity style={{ ...styles.nextButton, ...style }} onPress={handlePressNext}>
    <MonoText style={styles.nextButtonText}>{title}</MonoText>
  </TouchableOpacity>
)

export default NextButton
