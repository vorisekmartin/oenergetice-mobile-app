// @flow
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { setExpoToken } from "../../actions/generalActions"

export const registerForPushNotificationsAsync = () => async dispatch => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  let experienceId
  if (!Constants.manifest) {
    // Absence of the manifest means we're in bare workflow
    experienceId = "@username/example"
  }

  let finalStatus = existingStatus
  console.log(`existingStatus: ${existingStatus}`)
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return
  }

  // Get the token that uniquely identifies this device
  const { data: token } = await Notifications.getExpoPushTokenAsync()
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
