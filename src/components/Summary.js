// @flow
import React from "react"
import { connect } from "react-redux"
import axios from "axios"
import qs from "qs"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { MonoText } from "./StyledText"
import { API_ENDPOINTS } from "../constants/constants"
import {
  categoryNamesSelector,
  ctkPostSelector,
  imageIdsSelector,
  mainCategoryNameSelector,
  mainImageIdSelector,
  tagsNameSelector,
} from "../selectors/ctkSelectors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2a3f53",
    padding: 24,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 26,
    color: "#fff",
  },
})

class Summary extends React.Component {
  handleSubmit = () => {
    const url = API_ENDPOINTS.SUBMIT_POST
    const params = {
      title: this.props.post.title,
      date: this.props.post.date,
      text: this.props.post.text,
      featured_image: `[${this.props.mainImageId}]`,
      selected_images: `[${this.props.imageIds.join(", ")}]`,
      selected_tags: `[${this.props.tags.join(", ")}]`,
      selected_category: `[${this.props.categories.join(", ")}]`,
      main_category: `[${this.props.mainCategory}]`,
      twitter_text: this.props.post.title,
      token: this.props.token,
    }
    console.log("SUBMIT PARAMS")
    console.log(params)
    axios
      .post(url, qs.stringify(params))
      .then(resp => {})
      .catch()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <MonoText style={styles.title}>Publikovat</MonoText>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(state => ({
  post: ctkPostSelector(state),
  mainImageId: mainImageIdSelector(state),
  imageIds: imageIdsSelector(state),
  tags: tagsNameSelector(state),
  categories: categoryNamesSelector(state),
  mainCategory: mainCategoryNameSelector(state),
  token: state.general.token,
}))(Summary)
