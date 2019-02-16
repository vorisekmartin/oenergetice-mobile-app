// @flow
import React from "react"
import { ListView } from "react-native"
import { connect } from "react-redux"
import PostListRow from "../../components/PostListRow"

const PostList = ({ handleSelectPost, ds, posts }) => (
  <ListView
    dataSource={ds.cloneWithRows(posts)}
    renderRow={(row, empty, index) => (
      <PostListRow selectPost={handleSelectPost} ind={empty} index={index} key={index} {...row} />
    )}
  />
)

export default connect(state => ({
  posts: state.ctk.posts,
}))(PostList)
