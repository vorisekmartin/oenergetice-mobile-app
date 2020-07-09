// @flow
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { Platform } from "react-native"
import { setExpoToken } from "../../actions/generalActions"

export const registerForPushNotificationsAsync = () => async dispatch => {
  let token
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert("Must use physical device for Push Notifications")
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  dispatch(setExpoToken(token))
  console.log(`token:${token}`)

  const PUSH_ENDPOINT = `https://app.oenergetice.cz/oenergetice/users/${token}`

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  // eslint-disable-next-line
  return fetch(PUSH_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
}
