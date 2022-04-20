import {FIND_ALL_POSTS, DELETE_POST, CREATE_POST, UPDATE_POST}
  from "../actions/post-actions";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_POST:
      return state.map(
          post => post._id === action.post._id ?
              action.post : post);
    case CREATE_POST:
      return [
        ...state,
        action.newPost
      ];
    case FIND_ALL_POSTS:
      return action.posts;
    case DELETE_POST:
      return state.filter(
          post => post._id !== action.post._id);
    default:
      return state;
  }
}
export default postsReducer;