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
import PostListRow from "./PostListRow"
import { API_ENDPOINTS } from "../constants/constants"
import ListTagRow from "./ListTagRow"
import { setPostCategory, setPostTags } from "../actions/ctkActions"
import { TAXONOMY_TYPE } from "../reducers/ctkConstants"
import { categoriesSelector } from "../ctkSelectors"

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
      suggestedTags: [],
    }
    if (this.props.type === TAXONOMY_TYPE.CATEGORY) {
      this.fetchTags("")
    }
  }

  fetchTags = text => {
    const params = { query: text, type: this.props.type }
    const url = `${API_ENDPOINTS.POST_TAGS}?${queryString.stringify(params)}`
    const that = this
    axios.get(url).then(resp => {
      that.setState({ suggestedTags: resp.data })
    })
  }

  handleChangeInputText = text => {
    this.setState({ text })
    if (text.length > 2 || this.props.type === TAXONOMY_TYPE.CATEGORY) {
      this.fetchTags(text)
    }
  }

  handleSelectTag = taxonomy => {
    if (this.props.type === TAXONOMY_TYPE.TAG) {
      const newTags = [...this.props.tags, taxonomy]
      this.props.dispatch(setPostTags(newTags))
    } else if (this.props.type === TAXONOMY_TYPE.CATEGORY) {
      const newTags = [...this.props.categories, taxonomy]
      console.log(newTags)
      this.props.dispatch(setPostCategory(newTags))
    }
  }

  handleRemoveTag = tag => {
    const newTags = fp.difference(this.props.tags)([tag])
    this.props.dispatch(setPostTags(newTags))
  }

  render() {
    const { title, tags, type, categories } = this.props

    const selectedTaxonomy = type === TAXONOMY_TYPE.TAG ? this.props.tags : this.props.categories

    const filteredTags =
      type === TAXONOMY_TYPE.TAG
        ? fp.difference(this.state.suggestedTags)(tags)
        : fp.difference(this.state.suggestedTags)(categories)

    return (
      <View style={styles.container}>
        <Heading title={title} />
        <Text>{type === TAXONOMY_TYPE.TAG ? "Štítky" : "Kategorie"}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.handleChangeInputText(text)}
          value={this.state.text}
        />
        <ScrollView>
          <MonoText>Vybráno:</MonoText>
          {selectedTaxonomy.length > 0 && (
            <ListView
              dataSource={this.state.ds.cloneWithRows(selectedTaxonomy)}
              renderRow={(row, empty, index) => (
                <ListTagRow tag={row} handlePress={this.handleRemoveTag} {...row} />
              )}
            />
          )}
          <MonoText>Návrhy:</MonoText>
          {filteredTags.length > 0 && (
            <ListView
              dataSource={this.state.ds.cloneWithRows(filteredTags)}
              renderRow={(row, empty, index) => (
                <ListTagRow
                  handlePress={this.handleSelectTag}
                  highlight={this.state.text}
                  suggestion
                  {...row}
                  tag={row}
                />
              )}
            />
          )}
        </ScrollView>
        <NextButton handlePressNext={() => alert("not ready yet")} />
      </View>
    )
  }
}

export default connect(state => ({
  tags: state.ctk.tags,
  categories: categoriesSelector(state),
}))(PostTags)
