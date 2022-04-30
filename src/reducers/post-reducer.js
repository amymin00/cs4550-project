import {
    FIND_ALL_POSTS,
    DELETE_POST,
    CREATE_POST,
    UPDATE_POST,
    FIND_POSTS_BY_AUTHOR,
    FIND_POSTS_BY_SONG } from "../actions/post-actions";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_POST:
      return state.map(
          post => post._id === action.post._id ?
              action.post : post);
    case CREATE_POST:
      return [
        action.newPost,
        ...state,
      ];
    case FIND_ALL_POSTS:
      return action.posts;
    case FIND_POSTS_BY_SONG:
      return action.posts;
    case FIND_POSTS_BY_AUTHOR:
      return action.posts;
    case DELETE_POST:
      return state.filter(
          post => post._id !== action.post._id);
    default:
      return state;
  }
}
export default postsReducer;