// @flow
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
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

class ListImageRow extends React.Component {
  render() {
    const { mainImage, suggestion, handlePress, image, handleLongPress, url } = this.props
    return (
      <TouchableOpacity
        onPress={() => handlePress(image)}
        onLongPress={() => handleLongPress && handleLongPress(image)}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", maxWidth: "90%" }}>
            <View>
              <Image style={{ width: 150, height: 90 }} source={{ uri: url }} />
            </View>
          </View>

          {suggestion ? (
            <Icon name="plus-circle" color="green" size={22} />
          ) : (
            <View style={styles.labelContainer}>
              {mainImage && <MainCategoryLabel />}
              <Icon color="red" name="minus-circle" size={22} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

export default ListImageRow
