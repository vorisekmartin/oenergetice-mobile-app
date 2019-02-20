// @flow
import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import queryString from "query-string"
import fp from "lodash/fp"

import { Dimensions, StyleSheet, View, ScrollView, ListView, TextInput, Text } from "react-native"
import { MonoText } from "./StyledText"
import Heading from "./common/Heading"
import NextButton from "./NextButton"

import { API_ENDPOINTS } from "../constants/constants"
import ListImageRow from "./ListImageRow"
import { setPostImages, setMainImage } from "../actions/ctkActions"

import {
  categoriesSelector,
  imagesSelector,
  mainCategorySelector,
  mainImageSelector,
} from "../selectors/ctkSelectors"

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
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
})

class PostTags extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      text: "",
      suggestedImages: [],
    }
  }

  fetchImages = text => {
    const params = { query: text }
    const url = `${API_ENDPOINTS.POST_IMAGES}?${queryString.stringify(params)}`
    const that = this
    axios.get(url).then(resp => {
      that.setState({ suggestedImages: resp.data })
    })
  }

  handleChangeInputText = text => {
    this.setState({ text })
    if (text.length > 1) {
      this.fetchImages(text)
    }
  }

  handleSelectImage = image => {
    const newTags = [...this.props.images, image]
    this.props.dispatch(setPostImages(newTags))
  }

  handleRemoveImage = image => {
    const newImages = fp.difference(this.props.images)([image])
    this.props.dispatch(setPostImages(newImages))
  }

  handleLongPress = image => {
    const { dispatch } = this.props
    dispatch(setMainImage(image))
  }

  render() {
    const { title, mainImage, images } = this.props

    const filteredImages = fp.difference(this.state.suggestedImages)(images)
    return (
      <View style={styles.container}>
        <Heading title={title} />
        <Text>Obrázky</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.handleChangeInputText(text)}
          value={this.state.text}
        />
        <ScrollView>
          <MonoText>Vybráno:</MonoText>
          {images.length > 0 && (
            <ListView
              dataSource={this.state.ds.cloneWithRows(images)}
              renderRow={(row, empty, index) => (
                <ListImageRow
                  image={row}
                  mainImage={fp.isEqual(mainImage)(row)}
                  handlePress={this.handleRemoveImage}
                  handleLongPress={this.handleLongPress}
                  {...row}
                />
              )}
            />
          )}
          <MonoText>Návrhy:</MonoText>
          {filteredImages.length > 0 && (
            <ListView
              dataSource={this.state.ds.cloneWithRows(filteredImages)}
              renderRow={(row, empty, index) => (
                <ListImageRow
                  handlePress={this.handleSelectImage}
                  highlight={this.state.text}
                  suggestion
                  {...row}
                  image={row}
                />
              )}
            />
          )}
        </ScrollView>
      </View>
    )
  }
}

export default connect(state => ({
  images: imagesSelector(state),
  mainImage: mainImageSelector(state),
}))(PostTags)
