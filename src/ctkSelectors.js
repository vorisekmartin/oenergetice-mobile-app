// @flow
import { createSelector } from "reselect"
import fp from "lodash/fp"
import { CTK_STATES } from "./reducers/ctkConstants"

export const ctkStateSelector = state => state.ctk.state
export const ctkPostSelector = state => state.ctk.post
export const categoriesSelector = state => state.ctk.categories

export const nextStateSelector = createSelector(
  ctkStateSelector,
  ctkPostSelector,
  (state, post) => {
    const nextIndex = fp.get("index")(state) + 1
    const nextState = fp.compose(
      fp.head,
      fp.filter(item => item.index === nextIndex),
    )(CTK_STATES)
    if (nextIndex === 1 && fp.isEmpty(post)) {
      return state
    }
    return nextState
  },
)
