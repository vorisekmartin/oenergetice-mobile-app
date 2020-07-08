// @flow
import React from "react"
import { FlatList } from "react-native"
import { connect } from "react-redux"
import PostListRow from "../../components/PostListRow"
import { MonoText } from "../../components/StyledText"

const PostList = ({ handleSelectPost, posts, token }) => (
  <>
    <MonoText style={{ fontSize: 10, marginLeft: 10 }}>{token}</MonoText>
    <FlatList
      data={posts}
      renderItem={({ item, index }) => (
        <PostListRow selectPost={handleSelectPost} index={index} key={index} {...item} />
      )}
    />
  </>
)

export default connect(state => ({
  posts: state.ctk.posts,
  token: state.general.token,
}))(PostList)
