// @flow
import React from "react"
import { Platform, StatusBar, View } from "react-native"
import { AppLoading, Notifications } from "expo"
import * as Font from "expo-font"
import * as Icon from "@expo/vector-icons"

import { Asset } from "expo-asset"
import { connect } from "react-redux"

import AppNavigator from "./navigation/AppNavigator"
import { registerForPushNotificationsAsync } from "./scripts/notifications/registerForPushNotification"
import { fetchCTKPosts } from "./scripts/fetchCTKPosts"
import { styles } from "./styles/App.styles"

class Root extends React.Component {
  state = {
    isLoadingComplete: false,
    notification: {}, // eslint-disable-line
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(registerForPushNotificationsAsync())
    dispatch(fetchCTKPosts())

    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  _handleNotification = notification => {
    this.setState({ notification }) // eslint-disable-line
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    }
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <AppNavigator />
      </View>
    )
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("../assets/images/robot-dev.png"), // eslint-disable-line
        require("../assets/images/robot-prod.png"), // eslint-disable-line
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"), // eslint-disable-line
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

export default connect(state => ({
  token: state.token,
  posts: state.posts,
}))(Root)
