import React, { useEffect, useRef, useState } from "react";
import SecureContent from "../secureContent";
import { createPost } from "../../actions/post-actions";
import { useDispatch } from "react-redux";
import { useProfile } from "../../contexts/profileContext";
import * as service from '../../services/song-service';

const CreatePost = ({className = ''}) => {
    const dispatch = useDispatch();
    const { currentUser } = useProfile();
    // usersSongs initially undefined to wait for useProfile to 
    // correctly get currentUser and tell the difference between
    // that waiting and a user with no songs
    const [usersSongs, setUsersSongs] = useState();
    const titleRef = useRef();
    const textRef = useRef();
    const songRef = useRef();

    useEffect(() => {
        if (currentUser && !usersSongs) {
            const findUsersSongs = async () => {
                const songs = await service.findSongsById(currentUser.songs);
                setUsersSongs(songs);
            };
            findUsersSongs();
        }
    }, [currentUser]);

    const handleCreate = async e => {
        e.preventDefault();

        try {
            const post = {
                title: titleRef.current.value,
                author: currentUser._id,
                song: songRef.current.value,
                text: textRef.current.value,
            };
            await createPost(dispatch, post);
            
            titleRef.current.value = "";
            songRef.current.value = "";
            textRef.current.value = "";
        } catch (e) {
            alert('Unable to create post. Try again');
        }
    };

    if (currentUser) {
        return (
            <SecureContent>
                <div className={`bg-light p-2 rounded-1 pb-5 mb-4 ${className}`}>
                    <h5 className="mb-2">Create a Post</h5>
                    <form>    
                        {/* title */}
                        <div className="form-outline mb-2">
                            <input required 
                                    ref={titleRef}
                                    type="text" id="registerName" 
                                    className="form-control rounded-1"
                                    placeholder="Title" />
                        </div>
                        
                        {/* song */}
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
                                    usersSongs.map(s => <option value={s.id}>{s.name} by {s.artists[0].name}</option>)
                                }
                            </select>
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
    } else {
        return null;
    }
};

export default CreatePost;