import {
  FIND_ALL_COMMENTS,
  DELETE_COMMENT,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  FIND_COMMENTS_IN_IDLIST
}
  from "../actions/comment-actions";

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return state.map(
          comment => comment._id === action.comment._id ?
              action.comment : comment);
    case CREATE_COMMENT:
      return [
        action.newComment,
        ...state
      ];
    case FIND_ALL_COMMENTS:
      return action.comments;
    case DELETE_COMMENT:
      return state.filter(
          comment => comment._id !== action.comment._id);
    default:
      return state;
  }
}
export default commentsReducer;