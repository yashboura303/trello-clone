import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = '/api/boards/'

export const fetchBoardById = (id) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_BOARD })
  axios
    .get(BASE_URL + id)
    .then((res) => {
      dispatch({
        type: ACTIONS.GET_BOARD_BY_ID,
        payload: { currBoard: res.data },
      })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e } })
    })
}

export const fetchListsFromBoard = (id) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_LIST })
  axios
    .get(`${BASE_URL + id}/lists`)
    .then((res) => {
      dispatch({ type: ACTIONS.GET_LISTS, payload: { lists: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_LIST, payload: { error: e } })
    })
}

export const fetchsCardsFromBoard = (id) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_CARD })
  axios
    .get(`${BASE_URL + id}/cards`)
    .then((res) => {
      dispatch({ type: ACTIONS.GET_CARDS, payload: { cards: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_CARD, payload: { error: e.message } })
    })
}
