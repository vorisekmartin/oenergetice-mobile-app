// @flow
import React from "react"
import { Image, ScrollView, Text, TouchableOpacity, ListView, View } from "react-native"
import { WebBrowser } from "expo"
import { connect } from "react-redux"

import { styles } from "../styles/HomeScreen.styles"
import PostListRow from "../components/PostListRow"
import { setPost } from "../actions/ctkActions"
import TopBar from "../components/TopBar"

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <TopBar>Ctk</TopBar>,
  }

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
  }

  handleSelectPost = index => {
    const { dispatch, posts } = this.props
    console.log(`index: ${index}`)
    dispatch(setPost(posts[index]))
  }

  render() {
    console.log(this.props.post)
    return (
      <View style={styles.container}>
        {this.props.posts && (
          <ListView
            dataSource={this.state.ds.cloneWithRows(this.props.posts)}
            renderRow={(row, empty, index) => (
              <PostListRow
                selectPost={this.handleSelectPost}
                ind={empty}
                index={index}
                key={index}
                {...row}
              />
            )}
          />
        )}
      </View>
    )
  }

  _maybeRenderDevelopmentModeWarning() {
    // eslint-disable-next-line
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      )

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      )
    }
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode, your app will run at full speed.
      </Text>
    )
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync("//docs.expo.io/versions/latest/guides/development-mode")
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "//docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes",
    )
  }
}

export default connect(state => ({
  posts: state.posts,
  post: state.post,
  ctkScreenState: state.ctk.status,
}))(HomeScreen)
