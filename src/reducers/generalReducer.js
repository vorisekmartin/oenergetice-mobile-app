import fp from "lodash/fp"

const DEFAULT_STATE = {
  user: "no user",
  token: "no token",
}

export const generalReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return fp.set("user", action.payload)(state)
    case "SET_TOKEN":
      return fp.set("token", action.payload)(state)
    default:
      return state;
  }
}