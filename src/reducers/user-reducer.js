import {FIND_ALL_USERS, DELETE_USER, CREATE_USER, UPDATE_USER}
  from "../actions/user-actions";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_USER:
      return state.map(
          user => user._id === action.user._id ?
              action.user : user);
    case CREATE_USER:
      return [
        ...state,
        action.newTuit
      ];
    case FIND_ALL_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter(
          user => user._id !== action.user._id);
    default:
      return state;
  }
}
export default usersReducer;