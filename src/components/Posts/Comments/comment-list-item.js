import React from "react";

const ListOfCommentsItem = ({
  comment = {
    author: "bill",
    timestamp: 1650033618075,
    text: "comment",

  }
}) => {
  return (
      <ul className="list-group-item">
        <div className="d-inline-block">
          {comment.author && comment.timestamp && <p className="fw-bold pe-3">{comment.author} <span><p>{comment.timestamp}</p></span></p>}
          {comment.text &&<p>{comment.text}</p>}
        </div>
      </ul>
  );
}
export default ListOfCommentsItem;