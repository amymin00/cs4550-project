import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import * as userService from "../../../actions/user-actions";
import timeAgo from "../../../utils/TimeAgoUtil";

const ListOfCommentsItem = ({
  comment = {
    author: "bill",
    timestamp: 1650033618075,
    text: "comment",
  }
}) => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState(null);

  const getAuthor = async () => {
    const author = await userService.findUserById(comment.author);
    console.log(comment.author);
    setAuthor(author);
    console.log(author.name);
  }
  useEffect(getAuthor, []);

  return (
      <ul className="list-group-item">
        <div className="d-inline-block">
          <p className="fw-bold pe-3">{comment.author}
            <span><p className="d-inline fw-normal ps-2">{timeAgo(comment.timestamp)}</p></span></p>
          <p>{comment.text}</p>
        </div>
      </ul>
  );
}
export default ListOfCommentsItem;