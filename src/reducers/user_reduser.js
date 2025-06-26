import {
  SET_USER,
} from "../actions";

const user_reducer = (state, action) => {
    if (action.type === SET_USER) {
      return { ...state,User:action.payload };
    }

};
export default user_reducer;
