// @flow
import fp from "lodash/fp"
import { CTK_STATES } from "./ctkConstants"

const DEFAULT_STATE = {
  state: CTK_STATES.DEFAULT,
  posts: [],
  post: {},
  tags: [],
}

export const ctkReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_CTK_POSTS":
      return fp.set("posts", action.payload)(state)
    case "SET_POST":
      return fp.set("post", action.payload)(state)
    case "SET_CTK_STATE":
      return fp.set("state", action.payload)(state)
    case "SET_POST_TAGS":
      return fp.set("tags", action.payload)(state)
    default:
      return state
  }
}
