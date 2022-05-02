import React from "react";
import ListOfCommentsItem from "./comment-list-item";

const CommentList = ({comments = []}) => {

  return (
      <div className="mt-5">
        <ul className="list-group">
          <ul className="list-group-item bg-light">
            <h5>Comments</h5>
          </ul>
          {
              (comments.length > 0 && comments.map(comment =>
                  <ListOfCommentsItem key={comment._id}
                                comment={comment}/>)
              ) ||
              <span className="text-muted">No comments to show</span>
          }


        </ul></div>
  );
}

export default CommentList;