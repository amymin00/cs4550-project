import React from "react";
import ListOfCommentsItem from "./comment-list-item";

const CommentList = ({comments = []}) => {

  return (
      <div className="mt-5">
        <ul className="list-group">
          {
              comments.map && comments.map(comment =>
                  <ListOfCommentsItem key={comment._id}
                                comment={comment}/>)
          }


        </ul></div>
  );
}

export default CommentList;