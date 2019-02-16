// @flow
import React from "react"
import { Text, ListView, View } from "react-native"
import { connect } from "react-redux"

import TopBar from "../components/TopBar"

import { styles } from "../styles/HomeScreen.styles"
import { setCtkState, setPost } from "../actions/ctkActions"
import { CTK_STATES } from "../reducers/ctkConstants"
import PostList from "./CTK/PostList"
import PostDetails from "../components/PostDetails"
import PostTags from "../components/PostTags"

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <TopBar />,
  }

  constructor(props) {
    super(props)
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
  }

  handleSelectPost = index => {
    const { dispatch, posts } = this.props
    dispatch(setPost(posts[index]))
    dispatch(setCtkState(CTK_STATES.POST_SELECTED))
  }

  handleSelectTags = () => {
    const { dispatch } = this.props
    dispatch(setCtkState(CTK_STATES.TAGS))
  }

  shouldRenderPostList = () =>
    this.props.state === CTK_STATES.DEFAULT && this.props.posts.length !== 0

  shouldRenderSinglePost = () => this.props.state === CTK_STATES.POST_SELECTED && this.props.post

  shouldRenderTags = () => this.props.state === CTK_STATES.TAGS

  shouldRenderFeaturedImage = () => this.props.state === CTK_STATES.FEATURED

  shouldRenderImage = () => this.props.state === CTK_STATES.IMAGES

  shouldRenderCategory = () => this.props.state === CTK_STATES.CATEGORY

  render() {
    const { post } = this.props
    return (
      <View style={styles.container}>
        {this.shouldRenderPostList() && (
          <PostList ds={this.state.ds} handleSelectPost={this.handleSelectPost} />
        )}
        {this.shouldRenderSinglePost() && (
          <PostDetails {...post} handleSelectTags={this.handleSelectTags} />
        )}
        {this.shouldRenderTags() && <PostTags title={post.title} />}
        {this.shouldRenderCategory() && <PostTags title={post.title} />}
        {this.shouldRenderFeaturedImage() && <PostTags title={post.title} />}
        {this.shouldRenderImage() && <PostTags title={post.title} />}
      </View>
    )
  }
}

export default connect(state => ({
  post: state.ctk.post,
  posts: state.ctk.posts,
  state: state.ctk.state,
}))(HomeScreen)