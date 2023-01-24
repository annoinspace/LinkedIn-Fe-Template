import { SET_USER } from "../actions";

const initialState = {
  user: [],
};

const addMainLogin = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default addMainLogin;
