// @flow
import { createSelector } from "reselect"

export const ctkState = state => state.ctk.state

export const nextStateSelector = createSelector(
  ctkState,
  state => {
    return state
  },
)
