import React, {useEffect, useState} from "react";
import * as userService from "../../../services/user-service";
import { deleteComment } from "../../../actions/comment-actions";
import timeAgo from "../../../utils/TimeAgoUtil";
import { useDispatch } from "react-redux";
import { useProfile } from "../../../contexts/profileContext";
import refreshPage from "../../../utils/refreshPage";

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
    const [currentUserId, setCurrentUserId] = useState();
    const { checkLoggedIn } = useProfile();

    useEffect(() => {
        const check = async () => {
          try {
            const user = await checkLoggedIn();
            if (user) {
              setCurrentUserId(user._id);
            }
          } catch (e) {
            console.log(`Caught error in user-list-item.js: ${e}`);
          }
        };
        check();
    }, []);

    const getAuthor = async () => {
        const author = await userService.findUserById(comment.author);
        setAuthor(author);
    }
    useEffect(getAuthor, []);

    const deleteItem = async () => {
        deleteComment(dispatch, comment);
        alert('Removing your comment...');
        refreshPage();
    };

    if (author) {
        return (
            <ul className="list-group-item w-100">
                <div className="d-inline-block w-100">
                    <div className="d-flex align-items-center w-100 justify-content-between">
                        <p className="fw-bold pe-3 mb-0">
                            {author.name}
                            <span className="d-inline fw-normal ps-2">{timeAgo(comment.timestamp)}</span>
                        </p>
                        {
                            currentUserId && comment.author === currentUserId &&
                            <i className="fa fa-remove text-warning"
                                role="button"
                                onClick={deleteItem}>
                            </i>
                        }
                    </div>
                    <p className="mt-2">{comment.text}</p>
                </div>
            </ul>
        );
    }

    return null;
}

export default ListOfCommentsItem;