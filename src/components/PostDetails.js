// @flow
import React from "react"
import { connect } from "react-redux"

import {
  Dimensions,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
} from "react-native"

import { WebView } from "react-native-webview"
import Icon from "react-native-vector-icons/FontAwesome"
import Heading from "./common/Heading"
import NextButton from "./NextButton"
import { setPostContent, setPostTitle } from "../actions/ctkActions"
import { currentNumberOfImagesSelector } from "../selectors/ctkSelectors"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
    // justifyContent: "flex-end",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  webView: {
    maxWidth: width,
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0)",
    // maxHeight: "80%",
  },
  saveClose: {},
})

const additionalStyles = `<style>* {font-size: ${Platform.OS === "ios" ? "42px" : "14px"};}</style>`

class PostDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headingValue: props.title,
      contentValue: props.text,
      headingEditable: false,
      contentEditable: false,
      contentButtonText: "Edit",
      contentButtonAction: this.toggleContentEditable,
    }
  }

  handleHeadingTextChange = headingValue => {
    this.setState({
      headingValue,
    })
  }

  handleContentTextChange = contentValue => {
    this.setState({
      contentValue,
    })
  }

  toggleHeadingEditable = () => {
    const { headingEditable } = this.state
    this.setState({
      headingEditable: !headingEditable,
    })
  }

  toggleContentEditable = () => {
    const { contentEditable, contentValue } = this.state
    if (contentEditable) {
      this.props.dispatch(setPostContent(this.state.contentValue))
    } else {
      let pattern = "<p>"
      const re = new RegExp(pattern, "g")
      pattern = "</p>"
      const re2 = new RegExp(pattern, "g")
      pattern = /\[image\]/g
      const re3 = new RegExp(pattern, "g")
      this.setState({
        contentValue: contentValue
          .replace(re, "\n<p>")
          .replace(re2, "</p>\n")
          .replace(re3, "\n\n[image]\n\n"),
      })
    }

    this.setState({
      contentEditable: !contentEditable,
      contentButtonText: contentEditable ? "Edit" : "Save",
    })
  }

  saveAndClose = () => {
    this.props.dispatch(setPostTitle(this.state.headingValue))
    this.setState({
      headingEditable: false,
    })
  }

  renderHeading = () => {
    const { title } = this.props
    return this.state.headingEditable ? (
      <View>
        <TextInput
          onChangeText={this.handleHeadingTextChange}
          value={this.state.headingValue}
          style={{ fontSize: 18, marginBottom: 10, color: "blue" }}
          onLongPress={this.toggleHeadingEditable}
          multiline
        />
        <NextButton title="Save and close" handlePressNext={this.saveAndClose} />
      </View>
    ) : (
      <TouchableOpacity onLongPress={this.toggleHeadingEditable}>
        <Heading title={title} />
      </TouchableOpacity>
    )
  }

  render() {
    const { text } = this.props
    return (
      <View style={styles.container}>
        {!this.state.contentEditable && this.renderHeading()}

        <NextButton
          title={this.state.contentButtonText}
          handlePressNext={this.state.contentButtonAction}
        />
        {this.state.contentEditable ? (
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 75 }}
            behavior="height"
          >
            <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={styles.webView}>
                  <TextInput
                    onChangeText={this.handleContentTextChange}
                    value={this.state.contentValue}
                    onLongPress={this.toggleHeadingEditable}
                    multiline
                  />
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        ) : (
          <WebView
            style={styles.webView}
            originWhitelist={["*"]}
            source={{ html: `${additionalStyles}${text}` }}
          />
        )}
      </View>
    )
  }
}

export default PostDetails
