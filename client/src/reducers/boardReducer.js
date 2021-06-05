import * as ACTIONS from '../actions/actions'

const initialState = {
  loading: true,
  currBoard: {},
}
export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST_BOARD:
      return { ...state, loading: true }
    case ACTIONS.GET_BOARD_BY_ID:
      return {
        ...state,
        loading: false,
        currBoard: action.payload.currBoard,
      }
    case ACTIONS.ERROR_BOARD:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case ACTIONS.UPDATE_BOARD: {
      return {
        ...state,
        currBoard: action.payload.board,
        loading: false,
      }
    }
    default:
      return state
  }
}
