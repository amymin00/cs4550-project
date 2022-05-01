import React, {useEffect, useState} from "react";
import * as userService from "../../../services/user-service";
import { deleteComment } from "../../../actions/comment-actions";
import timeAgo from "../../../utils/TimeAgoUtil";
import { useDispatch } from "react-redux";

const ListOfCommentsItem = ({
  comment = {
    _id: '00',
    author: "bill",
    timestamp: 1650033618075,
    text: "comment",
  }
}) => {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState(null);

    const getAuthor = async () => {
        const author = await userService.findUserById(comment.author);
        setAuthor(author);
    }
    useEffect(getAuthor, []);

    if (author) {
        return (
            <ul className="list-group-item">
                <div className="d-inline-block">
                    <div className="d-flex align-items-center w-100 justify-content-between">
                        <p className="fw-bold pe-3 mb-0">
                            {author.name}
                            <span className="d-inline fw-normal ps-2">{timeAgo(comment.timestamp)}</span>
                        </p>
                        <i className="fa fa-remove text-warning"
                            role="button"
                            onClick={() => deleteComment(dispatch, comment)}></i>
                    </div>
                    <p className="mt-2">{comment.text}</p>
                </div>
            </ul>
        );
    }

    return null;
}

export default ListOfCommentsItem;