import { GET_USER_CONNECTIONS } from "../actions"

const initialState = {
  allConnections: []
}

const getConnectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CONNECTIONS:
      return {
        ...state,
        allConnections: action.payload
      }
    default:
      return state
  }
}

export default getConnectionsReducer
