// @flow
import React from "react"
import { Dimensions } from "react-native"

import { StyleSheet, View, WebView } from "react-native"
import NextButton from "./NextButton"
import Heading from "./common/Heading"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  webView: {
    marginTop: 20,
    maxWidth: width,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
})

const additionalStyles = `<style>* {font-size: 42px;}</style>`

const PostDetails = ({ title, text, handleSelectTags }) => (
  <View style={styles.container}>
    <Heading title={title} />
    <WebView
      style={styles.webView}
      originWhitelist={["*"]}
      source={{ html: `${additionalStyles}${text}` }}
    />
    <NextButton handlePressNext={handleSelectTags} />
  </View>
)

export default PostDetails
