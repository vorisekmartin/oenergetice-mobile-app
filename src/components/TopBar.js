// @flow
import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import fp from "lodash/fp"
import Icon from "react-native-vector-icons/FontAwesome"
import { MonoText } from "./StyledText"
import NextButton from "./NextButton"
import { nextStateSelector, ctkStateSelector, ctkPostSelector } from "../selectors/ctkSelectors"
import { setCtkState } from "../actions/ctkActions"
import { CTK_STATES } from "../reducers/ctkConstants"

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    height: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 24,
    color: "#222",
    marginLeft: 0,
  },
  logoWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

const handlePress = ({ dispatch, nextState, state, post }) => {
  if (fp.isEqual(nextState)(state)) {
    if (state.index === 0) alert("Chybí vybraný post - klikni na článek, který chceš publikovat")
    if (state.index === 2)
      alert("Chybí hlavní kategorie - zvolí se dlouhým kliknutím na již vybranou kategorii")
    if (state.index === 4)
      alert(
        `Chybí úvodní obrázek - zvolí se dlouhým kliknutím na již vybraný obrázek nebo není dostatečný počet obrázků: mmusí být vybráno ${parseInt(
          post.image_count,
        ) + 1}`,
      )
  }
  dispatch(setCtkState(nextState))
}

const TopBar = props => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <TouchableOpacity onPress={() => props.dispatch(setCtkState(CTK_STATES.DEFAULT))}>
          <Icon style={styles.icon} color="#2a3f53" name="home" size={22} />
        </TouchableOpacity>
        <MonoText style={styles.title}>oEnergetice.cz</MonoText>
      </View>
      <NextButton
        style={{ height: 32, width: 100, padding: 0 }}
        handlePressNext={() => handlePress(props)}
      />
    </View>
  )
}
export default connect(state => ({
  post: ctkPostSelector(state),
  state: ctkStateSelector(state),
  nextState: nextStateSelector(state),
}))(TopBar)
