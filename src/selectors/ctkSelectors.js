// @flow
import { createSelector } from "reselect"
import fp from "lodash/fp"
import { CTK_STATES } from "../reducers/ctkConstants"

export const ctkStateSelector = state => state.ctk.state
export const ctkPostSelector = state => state.ctk.post
export const tagsSelector = state => state.ctk.tags
export const categoriesSelector = state => state.ctk.categories
export const mainCategorySelector = state => state.ctk.mainCategory
export const mainImageSelector = state => state.ctk.mainImage
export const imagesSelector = state => state.ctk.images
export const mainCategoryNameSelector = state => fp.get("ctk.mainCategory.name")(state)

export const tagsNameSelector = createSelector(tagsSelector, fp.map(fp.get("name")))
export const mainImageIdSelector = state => fp.get("ctk.mainImage.id")(state)
export const categoryNamesSelector = createSelector(categoriesSelector, fp.map(fp.get("name")))

export const imageIdsSelector = createSelector(
  imagesSelector,
  mainImageSelector,
  (images, mainImage) =>
    fp.compose(
      fp.map(fp.get("id")),
      fp.dropWhile(item => item.id === mainImage.id),
    )(images),
)

export const prevStateSelector = createSelector(ctkStateSelector, state => {
  const prevIndex = fp.get("index")(state) - 1 < 0 ? 0 : fp.get("index")(state) - 1
  const prevState = fp.compose(
    fp.head,
    fp.filter(item => item.index === prevIndex),
  )(CTK_STATES)

  return prevState
})

export const currentNumberOfImagesSelector = createSelector(ctkPostSelector, post => {
  if (!post || fp.isEmpty(post)) {
    return 0
  }
  const pattern = /\[image\]/g
  const re = new RegExp(pattern, "g")
  const occurence = (post.text.length - post.text.replace(re, "").length) / "[image]".length

  return occurence
})

export const nextStateSelector = createSelector(
  ctkStateSelector,
  ctkPostSelector,
  mainImageSelector,
  mainCategorySelector,
  imagesSelector,
  currentNumberOfImagesSelector,
  (state, post, mainImage, mainCategory, images, imagesCount) => {
    const nextIndex = fp.get("index")(state) + 1
    const nextState = fp.compose(
      fp.head,
      fp.filter(item => item.index === nextIndex),
    )(CTK_STATES)

    if (nextIndex === 1 && fp.isEmpty(post)) {
      return state
    }

    if (nextIndex === 3 && !mainCategory) {
      return state
    }

    if (nextIndex === 5 && images.length !== imagesCount + 1) {
      return state
    }

    if (nextIndex === 5 && !mainImage) {
      return state
    }

    return nextState
  },
)
