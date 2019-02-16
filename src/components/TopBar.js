// @flow
import React from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import fp from "lodash/fp"
import { MonoText } from "./StyledText"
import NextButton from "./NextButton"
import { nextStateSelector, ctkStateSelector } from "../ctkSelectors"
import { setCtkState } from "../actions/ctkActions"

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

const TopBar = ({ dispatch, nextState }) => {
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>oEnergetice.cz</MonoText>
      <NextButton
        style={{ height: 32, width: 100, padding: 0 }}
        handlePressNext={() => dispatch(setCtkState(nextState))}
      />
    </View>
  )
}
export default connect(state => ({
  state: ctkStateSelector(state),
  nextState: nextStateSelector(state),
}))(TopBar)
