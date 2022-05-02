import {useDispatch} from "react-redux";
import {deletePost, updatePost} from "../../actions/post-actions";
import React, {useEffect, useState} from "react";
import {createComment} from "../../actions/comment-actions";
import {useProfile} from "../../contexts/profileContext";
import CommentList from "./Comments";
import * as commentService from "../../services/comment-service";
import {findSong} from "../../services/song-service";
import * as userService from "../../services/user-service";
import timeAgo from "../../utils/TimeAgoUtil";
import refreshPage from "../../utils/refreshPage";

const PostListItem = ({
  post = null,
  hideImage = false,
}) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [numComments, setNumComments] = useState(0);
  const [song, setSong] = useState(null);
  const [currentUserId, setCurrentUserId] = useState();
  const [author, setAuthor] = useState(null);
  const {checkLoggedIn} = useProfile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const comment = {
    author: currentUserId,
    timestamp: 0,
    text: newComment,
  };

  useEffect(() => {
    const check = async () => {
      try {
        const user = await checkLoggedIn();
        if (user) {
          setIsLoggedIn(true);
          setCurrentUserId(user._id);
        }
      } catch (e) {
        console.log(`Caught error in user-list-item.js: ${e}`);
      }
    };
    const getAuthor = async () => {
        if (post) {
            const author = await userService.findUserById(post.author);
            setAuthor(author);
        }
    }
    const findPostsComments = async () => {
        if (post) {
            const comments = await commentService.findCommentsInIdList(post.comments);
            setComments(comments);
            setNumComments(comments.length);
        }
    }
    const getTrack = async () => {
        if (post && !song) {
            const track = await findSong(post.song);
            setSong(track);
        }
    };
    
    const getPostDataObj = async () => {
        await Promise.all([
            check(),
            getAuthor(),
            findPostsComments(),
            getTrack()
        ]);
    }
    getPostDataObj();
  }, [dispatch]);

  const alertLoginForAction = action => alert(`Please log in or create an account to ${action}!`);

  const handleAddNewCommentOrAlertAnon = async () => {
    if (isLoggedIn) {
      const commentToAdd = await createComment(dispatch, comment);
      await updatePost(dispatch, {
        ...post,
        post: post.comments.push(commentToAdd._id),
      });
      alert('Adding your comment...');
      refreshPage();
    } else {
        alertLoginForAction('comment');
    }
  };

  const toggleDisplayComments = () => {
    setShowComments(!showComments);
  }

  if (post && song && author) {
    return (
        <ul className={`list-group-item bg-secondary mb-2`}>
          <div className="card m-3">
            {
                !hideImage && 
                <a href={`/songs/details/${song.id}`}
                    className='text-decoration-none text-muted'>
                    <img src={song.album.cover} className="card-img-top"/>
                </a>
            }
            <div className="card-body">
              {
                !hideImage &&
                <a href={`/songs/details/${song.id}`}
                    className='text-decoration-none text-muted'>
                  <p className="card-title mb-0 lead">{song.name}</p>
                  <p className="card-subtitle mb-0 lead">{song.artists[0].name}</p>
                  <hr/>
                </a>
              }
              <h4>{post.title}</h4>
              <p className="card-text fw-bold">
                <a href={`/profile/${author.username}`}
                    className='text-decoration-none text-dark'>
                    {author.name}
                </a>
                <span><p className="d-inline fw-normal ps-2">{timeAgo(
                    post.timestamp)}</p></span></p>
              <p className="card-text">{post.text}</p>
            </div>
            <div>
              <p className="ps-3 pe-3 d-inline-block">
                {post.likes.includes(currentUserId) && <span role="button"><i
                    className="fas fa-heart text-secondary pe-1"
                    onClick={() => {
                      isLoggedIn && updatePost(dispatch, {
                        ...post,
                        post: post.likes.splice(post.likes.indexOf(currentUserId), 1),
                      })
                    }}></i>
                  </span>}
                {!post.likes.includes(currentUserId) && <span role="button"><i
                    className="far fa-heart pe-1"
                    onClick={() => {
                      (isLoggedIn && !post.likes.includes(currentUserId) &&
                      updatePost(dispatch, {
                        ...post,
                        post: post.likes.push(currentUserId),
                      })) || (!isLoggedIn && alertLoginForAction('like posts'))}}></i>
                  </span>}
                {post.likes.length} </p>
              <p className="pe-3 d-inline-block"><span role="button"><i
                  className={`fa${(showComments && 's') || 'r'} fa-comment`} onClick={() => toggleDisplayComments()}></i></span> {numComments}
              </p>
            </div>
            <div className="ms-3 me-3">
              <textarea className="form-control" value={newComment}
                        placeholder="Cool post!"
                        onChange={(event) =>
                            setNewComment(event.target.value)}>
              </textarea>
              <button
                  className="float-end btn btn-primary mt-2 mb-2 float-end"
                  onClick={() =>
                      handleAddNewCommentOrAlertAnon()}>
                Comment
              </button>
            </div>
            {showComments && <div className="mt-0 pe-3 ps-3 mb-3">
              <CommentList comments={comments}/>
            </div>}
          </div>
          {isLoggedIn && post.author=== currentUserId && <div className="float-end">
            <i onClick={() => deletePost(
                dispatch, post)}
                role="button"
               className="pt-3 fa fa-trash text-light fa-2x"/>
          </div>}
        </ul>
    );
  } else {
    return null;
  }
}
export default PostListItem;
