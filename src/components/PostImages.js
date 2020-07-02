// @flow
import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import queryString from "query-string"
import fp from "lodash/fp"

import { Dimensions, StyleSheet, View, ScrollView, FlatList, TextInput, Text } from "react-native"
import { MonoText } from "./StyledText"
import Heading from "./common/Heading"

import { API_ENDPOINTS } from "../constants/constants"
import ListImageRow from "./ListImageRow"
import { setPostImages, setMainImage } from "../actions/ctkActions"

import {
  currentNumberOfImagesSelector,
  imagesSelector,
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
      text: "",
      suggestedImages: [],
      shouldCall: true,
    }
  }

  fetchImages = text => {
    const params = { query: text }
    const url = `${API_ENDPOINTS.POST_IMAGES}?${queryString.stringify(params)}`
    const that = this
    console.log("call fetchImages")
    if (this.state.shouldCall) {
      this.setState({ shouldCall: false })
    } else {
      setTimeout(() => {
        this.setState({ shouldCall: true })
      }, 2000)
    }
    console.log("call fetchImages - pass")
    axios.get(url).then(resp => {
      that.setState({ suggestedImages: resp.data })
    })
  }

  handleChangeInputText = text => {
    this.setState({ text })
    if (text.length > 2) {
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
    const { title, mainImage, images, imagesCount } = this.props

    const filteredImages = fp.difference(this.state.suggestedImages)(images)
    return (
      <View style={styles.container}>
        <Heading title={title} />
        <Text>{`Obrázky - ${imagesCount + 1}`}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.handleChangeInputText(text)}
          value={this.state.text}
        />
        <ScrollView>
          <MonoText>Vybráno:</MonoText>
          {images.length > 0 && (
            <FlatList
              data={images}
              renderItem={({ item }) => (
                <ListImageRow
                  image={item}
                  mainImage={fp.isEqual(mainImage)(item)}
                  handlePress={this.handleRemoveImage}
                  handleLongPress={this.handleLongPress}
                  {...item}
                />
              )}
            />
          )}
          <MonoText>Návrhy:</MonoText>
          {filteredImages.length > 0 && (
            <FlatList
              data={filteredImages}
              renderItem={({ item }) => (
                <ListImageRow
                  handlePress={this.handleSelectImage}
                  highlight={this.state.text}
                  suggestion
                  {...item}
                  image={item}
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
  imagesCount: currentNumberOfImagesSelector(state),
}))(PostTags)
