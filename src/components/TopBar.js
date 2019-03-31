// @flow
import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import fp from "lodash/fp"
import Icon from "react-native-vector-icons/FontAwesome"
import { MonoText } from "./StyledText"
import NextButton from "./NextButton"
import {
  nextStateSelector,
  ctkStateSelector,
  ctkPostSelector,
  prevStateSelector,
  currentNumberOfImagesSelector,
} from "../selectors/ctkSelectors"
import { setCtkState, setPost } from "../actions/ctkActions"
import { CTK_STATES } from "../reducers/ctkConstants"
import { fetchCTKPosts } from "../scripts/fetchCTKPosts"

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

class TopBar extends React.Component {
  handlePress = () => {
    const { dispatch, nextState, state, post, imagesCount } = this.props
    if (fp.isEqual(nextState)(state)) {
      if (state.index === 0) alert("Chybí vybraný post - klikni na článek, který chceš publikovat")
      if (state.index === 2)
        alert("Chybí hlavní kategorie - zvolí se dlouhým kliknutím na již vybranou kategorii")
      if (state.index === 4)
        alert(
          `Chybí úvodní obrázek - zvolí se dlouhým kliknutím na již vybraný obrázek nebo není dostatečný počet obrázků: mmusí být vybráno ${imagesCount +
            1}`,
        )
    }
    dispatch(setCtkState(nextState))
  }

  handlePrev = () => {
    const { dispatch, prevState } = this.props
    dispatch(setCtkState(prevState))
  }

  handleReturnToHome = () => {
    const { dispatch } = this.props
    dispatch(setPost({}))
    dispatch(setCtkState(CTK_STATES.DEFAULT))
    dispatch(fetchCTKPosts())
  }

  render() {
    const { prevState } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <TouchableOpacity onPress={this.handleReturnToHome}>
            <Icon style={styles.icon} color="#2a3f53" name="home" size={22} />
          </TouchableOpacity>
          <MonoText style={styles.title}>oEnergetice.cz</MonoText>
        </View>
        {prevState.index >= 0 && (
          <NextButton
            title="Prev"
            style={{ height: 32, width: 50, padding: 0 }}
            handlePressNext={this.handlePrev}
          />
        )}
        <NextButton
          style={{ height: 32, width: 50, padding: 0 }}
          handlePressNext={this.handlePress}
        />
      </View>
    )
  }
}

export default connect(state => ({
  post: ctkPostSelector(state),
  state: ctkStateSelector(state),
  nextState: nextStateSelector(state),
  prevState: prevStateSelector(state),
  imagesCount: currentNumberOfImagesSelector(state),
}))(TopBar)
