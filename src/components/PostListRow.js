// @flow
import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { MonoText } from "./StyledText"

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#666",
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  text: {
    flex: 1,
    color: "black",
    backgroundColor: "#ededed",
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 12,
    paddingLeft: 12,
  },
})

const PostListRow = ({ title, index, selectPost }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => selectPost(index)}>
      <MonoText style={styles.text}>{title}</MonoText>
    </TouchableOpacity>
  </View>
)

export default PostListRow
