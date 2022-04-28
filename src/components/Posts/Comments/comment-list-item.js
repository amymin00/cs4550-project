import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteComment} from "../../../actions/comment-actions";

const ListOfCommentsItem = ({
  comment = {
    _id: '00',
    author: "bill",
    timestamp: 1650033618075,
    text: "comment",
  }
}) => {
//   console.log(comment._id);
  return (
      <ul className="list-group-item">
        <div className="d-inline-block">
          {comment.author && comment.timestamp && 
          <p className="fw-bold pe-3">
              {comment.author} 
              <br />
              {comment.timestamp}</p>}
          {comment.text &&<p>{comment.text}</p>}
        </div>
      </ul>
  );
}
export default ListOfCommentsItem;