import {useDispatch} from "react-redux";
import {updatePost} from "../../actions/post-actions";
import {useState} from "react";
import {createComment} from "../../actions/comment-actions";

const PostListItem = ({
  post = {
    _id: "",
    title: "",
    author: "",
    timestamp: 0,
    song: "",
    text: "",
    likes: 0,
    comments: [],
  }
}) => {
  const dispatch = useDispatch();
  // TODO get user name from user id in post.author
  const [newComment, setNewComment] =
      useState();
  const comment = {
    author: "", // current user._id
    timestamp: 0,
    text: newComment,
  };
  console.log(newComment);
  return (
      <ul className="list-group-item">
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Song name</h5>
              <h6 className="card-subtitle">Artist name</h6>
              <hr />
              <p className="card-text fw-bold">{post.author} <span><p>{post.timestamp}</p></span></p>
              <p className="card-text">{post.text}</p>
            </div>
          <div>
            <p className="ps-3 pe-3 d-inline-block">
                  <span><i className="far fa-heart text-red"
                           onClick={() => updatePost(dispatch, {
                             ...post,
                             likes: post.likes + 1
                           })}></i>
                  </span> {post.likes.length} </p>
            <p className="pe-3 d-inline-block"><span><i className="far fa-comment"></i></span> {post.comments.length}</p>
            {/* TODO add new comment*/}
          </div>
          <div>
              <textarea className="form-control" value={newComment} placeholder="Cool post!"
                        onChange={(event) =>
              setNewComment(event.target.value)}>
              </textarea>
              <button
                className="btn btn-primary rounded-pill mt-2 mb-2 float-end" onClick={() =>
                createComment(dispatch, comment)}>
              Comment
              </button>
          </div>
        </div>
      </ul>
  );
}
export default PostListItem;
