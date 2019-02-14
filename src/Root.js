import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon, Notifications } from 'expo';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { generalReducer } from "./reducers/generalReducer";

import AppNavigator from './navigation/AppNavigator';
import registerForPushNotificationsAsync from "./scripts/notifications/registerForPushNotification";
import { styles } from "./styles/App.styles"

const store = createStore(generalReducer);


class Root extends React.Component {
  state = {
    isLoadingComplete: false,
    notification: {},
  }

  componentDidMount() {
    const { dispatch } = this.props
    registerForPushNotificationsAsync(dispatch)

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };


  render() {
    console.log("token: " + this.props.token)
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <View style={styles.textContainer}>
            <Text>Origin: {this.state.notification.origin}</Text>
            <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
          </View>
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

export default connect(state => ({
  token: state.token,
}))(Root)
