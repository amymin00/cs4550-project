import {useDispatch} from "react-redux";
import {deletePost, updatePost} from "../../actions/post-actions";
import React, {useEffect, useState} from "react";
import {createComment} from "../../actions/comment-actions";
import {useProfile} from "../../contexts/profileContext";
import CommentList from "./Comments";
import * as commentService from "../../services/comment-service";
import {findSong} from "../../services/song-service";
import * as userService from "../../actions/user-actions";
import Loading from "../Loading";
import timeAgo from "../../utils/TimeAgoUtil";

const PostListItem = ({
  post = {
    _id: "",
    title: "",
    author: "",
    timestamp: 0,
    song: "",
    text: "",
    likes: [],
    comments: [],
  }
}) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [song, setSong] = useState(null);
  const [postAuthorId, setPostAuthorId] = useState();
  const [author, setAuthor] = useState(null);
  const {checkLoggedIn} = useProfile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const user = await checkLoggedIn();
        if (user) {
          setIsLoggedIn(true);
          setPostAuthorId(user._id);
        }
      } catch (e) {
        console.log(`Caught error in user-list-item.js: ${e}`);
      }
    };
    check();
  }, []);

  ////////////////////////////////////////////////////////////////
  // TODO getAuthor bug

  const getAuthor = async () => {
    const author = await userService.findUserById(post.author);
    setAuthor(author);
    console.log(author.name);
  }
  useEffect(getAuthor, []);

  ////////////////////////////////////////////////////////////////

  const comment = {
    author: postAuthorId,
    timestamp: 0,
    text: newComment,
  };

  const findPostsComments = async () => {
    const comments = await commentService.findCommentsInIdList(post.comments);
    setComments(comments);
  }
  useEffect(findPostsComments, [dispatch]);

  const handleAddNewCommentOrAlertAnon = async () => {
    if (isLoggedIn) {
      const commentToAdd = await createComment(dispatch, comment);
      console.log(commentToAdd);
      await updatePost(dispatch, {
        ...post,
        post: post.comments.push(commentToAdd._id),
      });
    } else {
      alert("Please log in or create an account to comment!");
    }
  };

  const toggleDisplayComments = () => {
    setShowComments(!showComments);
  }

  useEffect(() => {
    const getTrack = async () => {
      const track = await findSong(post.song);
      setSong(track);
    };
    getTrack();
  }, [post.song]);

  if (song) {
    return (
        <ul className="list-group-item bg-secondary m-5">
          <div className="card m-3">
            <img src={song.album.cover} className="card-img-top"/>
            <div className="card-body">
              <h5 className="card-title">{song.name}</h5>
              <h6 className="card-subtitle">{song.artists[0].name}</h6>
              <hr/>
              <p className="card-text fw-bold">{post.author}
                <span><p className="d-inline fw-normal ps-2">{timeAgo(
                    post.timestamp)}</p></span></p>
              <p className="card-text">{post.text}</p>
            </div>
            <div>
              <p className="ps-3 pe-3 d-inline-block">
                {post.likes.includes(postAuthorId) && <span><i
                    className="fas fa-heart text-secondary pe-1"
                    onClick={() => {
                      updatePost(dispatch, {
                        ...post,
                        post: post.likes.splice(post.likes.indexOf(postAuthorId), 1),
                      })
                    }}></i>
                  </span>}
                {!post.likes.includes(postAuthorId) && <span><i
                    className="far fa-heart pe-1"
                    onClick={() => {
                      !post.likes.includes(postAuthorId) &&
                      updatePost(dispatch, {
                      ...post,
                      post: post.likes.push(postAuthorId),
                    })}}></i>
                  </span>}
                {post.likes.length} </p>
              <p className="pe-3 d-inline-block"><span><i
                  className="far fa-comment" onClick={() =>toggleDisplayComments()}></i></span> {post.comments.length}
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
          {isLoggedIn && <div className="float-end">
            <i onClick={() => deletePost(
                dispatch, post)}
               className="pt-3 fa fa-trash text-light fa-2x"/>
          </div>}
        </ul>
    );
  } else {
    return <Loading/>
  }
}
export default PostListItem;
