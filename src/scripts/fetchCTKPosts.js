// @flow
import axios from "axios"
import { API_ENDPOINTS } from "../constants/constants"
import { setCtkPosts } from "../actions/ctkActions"

export const fetchCTKPosts = () => dispatch => {
  axios.get(API_ENDPOINTS.CTK_POSTS).then(resp => {
    dispatch(setCtkPosts(resp.data))
  })
}
