// @flow
import React from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"

import { MonoText } from "./StyledText"
import NextButton from "./NextButton"
import { nextStateSelector } from "../ctkSelectors"

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    height: 32,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 24,
    color: "#222",
    marginLeft: 10,
  },
})

const TopBar = ({ dispatch }) => {
  const nextState = ""
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>oEnergetice.cz</MonoText>
      <NextButton
        style={{ height: 32, width: 100, padding: 0 }}
        handlePressNext={() => dispatch()}
      />
    </View>
  )
}
export default connect(state => ({
  state: state.ctk.state,
  nextState: nextStateSelector(state),
}))(TopBar)
