import {useDispatch} from "react-redux";
import {deletePost, updatePost} from "../../actions/post-actions";
import React, {useEffect, useState} from "react";
import {createComment} from "../../actions/comment-actions";
import {useProfile} from "../../contexts/profileContext";
import CommentList from "./Comments";
import * as commentService from "../../services/comment-service";

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
  const [comments, setComments] = useState();
  const { profile } = useProfile();
  const comment = {
    author: '3pU1pel2ZJ8d1ExY_mYYy', // TODO only allow when logged in, fix with profile._id
    timestamp: 0,
    text: newComment,
  };

  const findPostsComments = async () => {
    const comments = await commentService.findCommentsInIdList(post.comments);
    setComments(comments);
    console.log(comments);
  }
  useEffect(findPostsComments, [dispatch]);

  // add new comment to post.comments ???
  const addNewComment = async () => {
    const commentToAdd = await createComment(dispatch, comment);
    console.log(commentToAdd);
    await updatePost(dispatch, {
      ...post,
      post: post.comments.push(commentToAdd._id),
    });
  };

  return (
      <ul className="list-group-item bg-secondary">
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Song name</h5>
              <h6 className="card-subtitle">Artist name</h6>
              <hr />
              <p className="card-text fw-bold">{post.author} {post.timestamp}</p>
              <p className="card-text">{post.text}</p>
            </div>
          <div>
            <p className="ps-3 pe-3 d-inline-block">
                  <span><i className="far fa-heart text-red"
                           onClick={() => updatePost(dispatch, {
                             ...post,
                             post: post.likes.push("3pU1pel2ZJ8d1ExY_mYYy"), // TODO add user.id when functional
                           })}></i>
                  </span> {post.likes.length} </p>
            <p className="pe-3 d-inline-block"><span><i className="far fa-comment"></i></span> {post.comments.length}</p>
            {/* TODO fix add new comment*/}
          </div>
          <div>
              <textarea className="form-control" value={newComment} placeholder="Cool post!"
                        onChange={(event) =>
              setNewComment(event.target.value)}>
              </textarea>
              <button
                className="btn btn-primary rounded-pill mt-2 mb-2 float-end" onClick={() =>
                  addNewComment()}>
              Comment
              </button>
          </div>
          <div className="mt-5">
            <CommentList comments={post.comments}/>
          </div>
        </div>
        <div className="float-end mb-0">
          <i onClick={() => deletePost(
              dispatch, post)}
             className="pt-3 fa fa-trash text-dark fa-2x"/>
        </div>
      </ul>
  );
}
export default PostListItem;
