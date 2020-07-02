// @flow
import React from "react"
import { FlatList } from "react-native"
import { connect } from "react-redux"
import PostListRow from "../../components/PostListRow"

const PostList = ({ handleSelectPost, posts }) => (
  <FlatList
    data={posts}
    renderItem={({ item, index }) => (
      <PostListRow selectPost={handleSelectPost} index={index} key={index} {...item} />
    )}
  />
)

export default connect(state => ({
  posts: state.ctk.posts,
}))(PostList)
