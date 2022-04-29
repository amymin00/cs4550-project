import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import * as userService from "../../../services/user-service";
import timeAgo from "../../../utils/TimeAgoUtil";

const ListOfCommentsItem = ({
  comment = {
    _id: '00',
    author: "bill",
    timestamp: 1650033618075,
    text: "comment",
  }
}) => {
  const [author, setAuthor] = useState(null);

  const getAuthor = async () => {
    const author = await userService.findUserById(comment.author);
    setAuthor(author);
  }
  useEffect(getAuthor, []);

  return (
      <ul className="list-group-item">
        <div className="d-inline-block">
          <p className="fw-bold pe-3">{author.name}
            <span><p className="d-inline fw-normal ps-2">{timeAgo(comment.timestamp)}</p></span></p>
          <p>{comment.text}</p>
        </div>
      </ul>
  );
}
export default ListOfCommentsItem;