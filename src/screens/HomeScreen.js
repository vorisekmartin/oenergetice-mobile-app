// @flow
import React from "react"
import fp from "lodash/fp"
import { Alert, KeyboardAvoidingView } from "react-native"
import { connect } from "react-redux"

import TopBar from "../components/TopBar"

import { styles } from "../styles/HomeScreen.styles"
import { setCtkState, setPost, setPostIndex } from "../actions/ctkActions"
import { CTK_STATES, TAXONOMY_TYPE } from "../reducers/ctkConstants"
import PostList from "./CTK/PostList"
import PostDetails from "../components/PostDetails"
import PostTags from "../components/PostTags"
import PostImages from "../components/PostImages"
import Summary from "../components/Summary"

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <TopBar />,
  }

  selectPost = (index, fresh = true) => {
    const { dispatch, posts, post } = this.props
    const newPost = fresh ? posts[index] : post
    dispatch(setPost(newPost))
    dispatch(setPostIndex(index))
    dispatch(setCtkState(CTK_STATES.POST_SELECTED))
  }

  handleSelectPost = index => {
    const { posts, post } = this.props
    if (fp.isEmpty(post) || fp.includes(post)(posts)) {
      this.selectPost(index)
    } else if (this.props.index && this.props.index !== index) {
      this.confirmSelectDifferent(index)
    } else {
      this.showAlert(index)
    }
  }

  confirmSelectDifferent = index => {
    Alert.alert(
      "Zvolen jiný příspěvek",
      "Zahodit změny původního?",
      [
        {
          text: "Vybrat znovu",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Zahodit změny", onPress: () => this.selectPost(index) },
      ],
      { cancelable: true },
    )
  }

  showAlert = index => {
    Alert.alert(
      "Změny",
      "Zahodit změny",
      [
        {
          text: "Ponechat změny",
          onPress: () => this.selectPost(index, false),
          style: "cancel",
        },
        { text: "Zahodit změny", onPress: () => this.selectPost(index) },
      ],
      { cancelable: true },
    )
  }

  handleSelectTags = () => {
    const { dispatch } = this.props
    dispatch(setCtkState(CTK_STATES.TAGS))
  }

  shouldRenderPostList = () =>
    this.props.state === CTK_STATES.DEFAULT && this.props.posts.length !== 0

  shouldRenderSinglePost = () => this.props.state === CTK_STATES.POST_SELECTED && this.props.post

  shouldRenderCategory = () => this.props.state === CTK_STATES.CATEGORY

  shouldRenderTags = () => this.props.state === CTK_STATES.TAGS

  shouldRenderImage = () => this.props.state === CTK_STATES.IMAGES

  shouldShowSummary = () => this.props.state === CTK_STATES.SUMMARY

  render() {
    const { post, dispatch } = this.props

    return (
      <KeyboardAvoidingView style={styles.container} behvior="padding">
        {this.shouldRenderPostList() && <PostList handleSelectPost={this.handleSelectPost} />}
        {this.shouldRenderSinglePost() && (
          <PostDetails {...post} dispatch={dispatch} handleSelectTags={this.handleSelectTags} />
        )}
        {this.shouldRenderCategory() && (
          <PostTags type={TAXONOMY_TYPE.CATEGORY} title={post.title} />
        )}
        {this.shouldRenderTags() && <PostTags type={TAXONOMY_TYPE.TAG} title={post.title} />}
        {this.shouldRenderImage() && <PostImages title={post.title} />}
        {this.shouldShowSummary() && <Summary />}
      </KeyboardAvoidingView>
    )
  }
}

export default connect(state => ({
  post: state.ctk.post,
  posts: state.ctk.posts,
  state: state.ctk.state,
  index: state.ctk.index,
}))(HomeScreen)
