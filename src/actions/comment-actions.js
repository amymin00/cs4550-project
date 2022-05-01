import * as service from '../services/comment-service';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FIND_ALL_COMMENTS = 'FIND_ALL_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const FIND_COMMENT_BY_ID = 'FIND_COMMENT_BY_ID';
export const FIND_COMMENTS_IN_IDLIST = 'FIND_COMMENTS_IN_IDLIST';

export const findAllComments = async (dispatch) => {
  const comments = await service.findAllComments();
  dispatch({
    type: FIND_ALL_COMMENTS,
    comments
  });
}

export const findCommentsInIdList = async (dispatch, listOfId) => {
  const comments = await service.findCommentsInIdList(listOfId);
  dispatch({
    type: FIND_COMMENTS_IN_IDLIST,
    comments
  });
}

export const findComment = async (dispatch) => {
  const comment = await service.findComment();
  dispatch({
    type: FIND_COMMENT_BY_ID,
    comment
  });
}

export const deleteComment = async (dispatch, comment) => {
  await service.deleteComment(comment);
  dispatch({
    type: DELETE_COMMENT,
    comment
  })
}

export const createComment = async (dispatch, comment) => {
  const newComment = await service.createComment(comment);
  dispatch({
    type: CREATE_COMMENT,
    newComment
  });
  return newComment;
}

export const updateComment = async (dispatch, comment) => {
  await service.updateComment(comment);
  dispatch({
    type: UPDATE_COMMENT,
    comment
  });
}

