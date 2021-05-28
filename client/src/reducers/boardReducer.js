import * as ACTIONS from '../actions/actions'

const initialState = {
  loading: true,
  boards: [],
  currBoard: {},
}
export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST_BOARD:
      return { ...state, loading: true, newBoard: undefined }
    case ACTIONS.GET_BOARD_BY_ID:
      return {
        ...state,
        loading: false,
        currBoard: action.payload.currBoard,
        newBoard: undefined,
      }
    case ACTIONS.ERROR_BOARD:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        boards: [],
        newBoard: undefined,
      }
    case ACTIONS.UPDATE_BOARD: {
      const boardsCopy = [...state.boards]
      const targetIndex = boardsCopy.findIndex(
        (board) => board._id === action.payload.board._id,
      )
      boardsCopy[targetIndex] = action.payload.board
      return {
        ...state,
        boards: boardsCopy,
        currBoard: action.payload.board,
        loading: false,
        newBoard: undefined,
      }
    }
    default:
      return state
  }
}
