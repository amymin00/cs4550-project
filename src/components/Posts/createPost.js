import React, { useEffect, useRef, useState } from "react";
import SecureContent from "../secureContent";
import { createPost } from "../../actions/post-actions";
import { useDispatch, useSelector } from "react-redux";
import { useProfile } from "../../contexts/profileContext";
import { findUsersSongs } from '../../actions/song-actions';

const CreatePost = ({className = '',
                     specificSong = undefined,
                     canPost = false,
}) => {
    const dispatch = useDispatch();
    const usersSongs = useSelector(state => state.songs);
    const { checkLoggedIn } = useProfile();
    const [currentUser, setCurrentUser] = useState();
    const titleRef = useRef();
    const textRef = useRef();
    const songRef = useRef();

    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                setCurrentUser(user);
            } catch (e) {
                console.log(`Error loading in createPost.js: ${e}`);
            }
        };
        check();
    }, []);

    useEffect(() => {
        if (currentUser) {
            const getSongs = async () => await findUsersSongs(dispatch, currentUser);
            getSongs();
        }
    }, [currentUser]);

    const handleCreate = async e => {
        e.preventDefault();

        try {
            if (canPost) {
                const post = {
                    title: titleRef.current.value,
                    author: currentUser._id,
                    song: specificSong ? specificSong.id : songRef.current.value,
                    text: textRef.current.value,
                };
                await createPost(dispatch, post);
                
                titleRef.current.value = "";
                textRef.current.value = "";
    
                if (songRef.current) {
                    songRef.current.value = "";
                }
            } else if (specificSong) {
                alert(`You must save ${specificSong.name} before posting about it`);
            }
        } catch (e) {
            alert(`Unable to create post. Try again`);
        }
    };

    if (currentUser) {
        return (
            <SecureContent>
                <div className={`bg-light p-2 rounded-1 pb-5 mb-4 ${className}`}>
                    <h5 className="mb-2">Create a Post</h5>
                    <form onSubmit={handleCreate}>    
                        {/* title */}
                        <div className="form-outline mb-2">
                            <input required 
                                    ref={titleRef}
                                    type="text" id="registerName" 
                                    className="form-control rounded-1"
                                    placeholder="Title" />
                        </div>
                        
                        {/* song */}
                        {
                            !specificSong && 
                            <div className="form-outline mb-4">
                                <select required
                                        ref={songRef}
                                        className="form-select"
                                        defaultValue={'DEFAULT'}>
                                    {
                                        (
                                            usersSongs && usersSongs.length > 0 &&
                                            <option value='DEFAULT' disabled>Select a song to post about</option>
                                        ) ||
                                        <option value='DEFAULT' disabled className="text-wrap">
                                            You have no {currentUser.creator && 'saved'} songs to share
                                        </option>
                                    }
                                    {
                                        usersSongs &&
                                        usersSongs.map(s => <option key={s.id} value={s.id}>{s.name} by {s.artists[0].name}</option>)
                                    }
                                </select>
                            </div>
                        }
    
                        {/* text */}
                        <div className="form-outline mb-2">
                            <textarea className="form-control rounded-1" 
                                        ref={textRef} 
                                        placeholder="Text (optional)">
                            </textarea>
                        </div>
    
                        <button className="btn btn-primary mb-2 float-end">
                            Post
                        </button>
                    </form>
                </div>
            </SecureContent>
        );
    } else {
        return null;
    }
};

export default CreatePost;