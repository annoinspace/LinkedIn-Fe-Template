import { GET_USER_CONNECTIONS, GET_UNCONNECTED_USERS } from "../actions"

const initialState = {
  allConnections: [],
  unconnectedUsers: []
}

const getConnectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CONNECTIONS:
      return {
        ...state,
        allConnections: action.payload
      }
    case GET_UNCONNECTED_USERS:
      return {
        ...state,
        unconnectedUsers: action.payload
      }
    default:
      return state
  }
}

export default getConnectionsReducer
