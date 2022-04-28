import React, {useEffect, useState} from "react";
import PostList from "../Posts";
import {useDispatch} from "react-redux";
import {createPost} from "../../actions/post-actions";
import {useProfile} from "../../contexts/profileContext";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [newPost, setNewPost] =
      useState();
  const { checkLoggedIn } = useProfile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [thisUser, setThisUser] = useState();

  useEffect(() => {
    const check = async () => {
      try {
        const user = await checkLoggedIn();
        if (user) {
          setIsLoggedIn(true);
          setThisUser(user);
        }
      } catch (e) {
        console.log(`Caught error in user-list-item.js: ${e}`);
      }
    };
    check();
  }, []);

  const post = {
    title: "New Post", // TODO add when srtyling new post
    author: "KLA8oCyQ5YvAfIq2Gau5R", // current user
    timestamp: 0, // handles in controller
    song: "2up3OPMp9Tb4dAKM2erWXQ", // TODO get from saved songs
    text: newPost,
    likes: [],
    comments: [],
  };
  return (
      <div>
        <div>
              <textarea className="form-control" value={newPost} placeholder="Cool post!"
                        onChange={(event) =>
                            setNewPost(event.target.value)}>
              </textarea>
          <button
              className="btn btn-primary rounded-pill mt-2 mb-2 float-end" onClick={() =>
              createPost(dispatch, post)}>
            Post
          </button>
        </div>
        <PostList />
      </div>
  )
};

export default HomeScreen;