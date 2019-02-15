// @flow
import fp from "lodash/fp"

const DEFAULT_STATE = {
  state: "default",
}

export const ctkReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_CTK_POSTS":
      return fp.set("posts", action.payload)(state)
    case "SET_POST":
      return fp.set("post", action.payload)(state)
    case "SET_STATE":
      return fp.set("state", action.payload)(state)
    default:
      return state
  }
}
