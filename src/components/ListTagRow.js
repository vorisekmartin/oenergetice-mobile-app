// @flow
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import MainCategoryLabel from "./MainCategoryLabel"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 6,
  },
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  scrollView: {
    color: "black",
  },
})

class ListTagRow extends React.Component {
  renderText = () => {
    const { name, highlight } = this.props

    const loweredName = name.toLowerCase()
    const loweredHighlight = highlight.toLowerCase()
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <Text>{loweredName.substring(0, loweredName.indexOf(loweredHighlight))}</Text>
        <Text style={{ fontWeight: "bold" }}>{loweredHighlight}</Text>
        <Text>
          {loweredName.substring(loweredName.indexOf(loweredHighlight) + highlight.length)}
        </Text>
      </View>
    )
  }

  render() {
    const {
      highlight,
      name,
      mainCategory,
      suggestion,
      handlePress,
      tag,
      handleLongPress,
    } = this.props

    return (
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => handlePress(tag)}
        onLongPress={() => handleLongPress && handleLongPress(tag)}
      >
        <View style={styles.container}>
          {highlight ? this.renderText() : <Text>{name}</Text>}
          {suggestion ? (
            <Icon name="plus-circle" color="green" size={22} />
          ) : (
            <View style={styles.labelContainer}>
              {mainCategory && <MainCategoryLabel />}
              <Icon color="red" name="minus-circle" size={22} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

export default ListTagRow
