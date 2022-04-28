import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteComment} from "../../../actions/comment-actions";
import {useProfile} from "../../../contexts/profileContext";
import * as userService from "../../../actions/user-actions";

const ListOfCommentsItem = ({
  comment = {
    author: "bill",
    timestamp: 1650033618075,
    text: "comment",
  }
}) => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState(null);
  const { profile } = useProfile();

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
          {comment.author && comment.timestamp && 
          <p className="fw-bold pe-3">
              {author.name}
              <br />
              {comment.timestamp}</p>}
          {comment.text &&<p>{comment.text}</p>}
        </div>
      </ul>
  );
}
export default ListOfCommentsItem;