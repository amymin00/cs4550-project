import React, {useState} from "react";
import PostList from "../Posts";
import {createPost} from "../../actions/post-actions";
import { useProfile } from '../../contexts/profileContext';
import { useDispatch } from "react-redux";
import SecureContent from "../secureContent";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [newPost, setNewPost] = useState();
    const post = {
        title: "", // TODO add when srtyling new post
        author: "", // TODO after implementing getUser by id
        timestamp: 0, // handles in controller
        song: "", // TODO after linking spotify
        text: newPost,
        likes: [],
        comments: [],
    };
    
    return (
            <div className="row mt-3">
                <div className="col">
                    <h4>Latest Activity</h4>

                </div>
                <div className="col">
                    <SecureContent>
                        <textarea className="form-control" value={newPost} placeholder="Cool post!"
                                    onChange={(event) => setNewPost(event.target.value)}>
                        </textarea>
                        <button
                            className="btn btn-primary rounded-pill mt-2 mb-2 float-end" onClick={() =>
                            createPost(dispatch, newPost)}>
                            Post
                        </button>
                    </SecureContent>
                    <PostList />
                </div>
                
            </div>
    );
};

export default HomeScreen;