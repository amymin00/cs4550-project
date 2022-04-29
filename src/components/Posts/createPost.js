import React, { useRef } from "react";
import SecureContent from "../secureContent";
import { createPost } from "../../actions/post-actions";
import { useDispatch } from "react-redux";
import { useProfile } from "../../contexts/profileContext";

const CreatePost = ({className = ''}) => {
    const dispatch = useDispatch();
    const titleRef = useRef();
    const textRef = useRef();
    const songRef = useRef();

    const handleCreate = async () => {
        try {
            const post = {
                title: titleRef.current.value,
                author: "", // TODO after implementing getUser by id
                song: songRef.current.value, // TODO after linking spotify
                text: textRef.current.value,
            };
            await createPost(dispatch, post);
        } catch (e) {
            alert('Unable to create post. Try again');
        }
    };

    // TODO: check if user is logged in before rendering create post
    return (
        <SecureContent>
            <div className={`bg-light p-2 rounded-1 pb-5 mb-4 ${className}`}>
                <h5 className="mb-2">Create a Post</h5>
                <form action="/">
                    Maybe a dropdown menu for selecting the song

                    {/* title */}
                    <div className="form-outline mb-2">
                        <input required 
                                ref={titleRef}
                                type="text" id="registerName" 
                                className="form-control rounded-1"
                                placeholder="Title" />
                    </div>

                    {/* text */}
                    <div className="form-outline mb-2">
                        <textarea className="form-control rounded-1" 
                                    ref={textRef} 
                                    placeholder="Text (optional)">
                        </textarea>
                    </div>

                    <button
                        className="btn btn-primary mb-2 float-end" 
                        onClick={handleCreate}>
                        Post
                    </button>
                </form>
            </div>
        </SecureContent>
    );
};

export default CreatePost;