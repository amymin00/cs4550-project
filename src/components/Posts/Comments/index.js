import React, {useEffect} from "react";
import {useDispatch, useSelector}
  from "react-redux";
import * as service
  from '../../../services/comment-service';
import ListOfCommentsItem from "./comment-list-item";

const CommentList = () => {
  const comments = useSelector(
      state => state.comments);
  const dispatch = useDispatch();
  const findAllComments = async () => {
    const users = await service.findAllComments();
    dispatch({
      type: 'FIND_ALL_COMMENTS',
      comments: comments
    });
  }
  useEffect(findAllComments, [dispatch]);

  return (
      <div className="mt-5">
        <ul className="list-group">
          {
              comments?.map(comment =>
                  <ListOfCommentsItem key={comment._id}
                                comment={comment}/>)
          }


        </ul></div>
  );
}

export default CommentList;