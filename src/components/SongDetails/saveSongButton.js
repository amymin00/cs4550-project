import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfile } from "../../contexts/profileContext";
import { saveSong, unsaveSong } from "../../actions/song-actions";

const SaveSongButton = ({songId = '', className=''}) => {
    const dispatch = useDispatch();
    const songSaved = useSelector(state => state.songSaved);
    const btnStyle = `w-auto btn btn-info ${className}`;
    const [currentUser, setCurrentUser] = useState();
    const { checkLoggedIn, updateCurrentUser } = useProfile();

    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                setCurrentUser(user);
            } catch (e) {
                console.log(`Unable to run checkLoggedIn in FollowButton index.js: ${e}`);
            }
        }
        check();
    }, []);

    useEffect(() => {
        // Update initial state of saved song reducer value
        if (currentUser) {
            if (currentUser.songs.includes(songId)) {
                saveSong(dispatch);
            } else {
                unsaveSong(dispatch);
            }
        }
    }, [currentUser]);

    const handleClick = () => {
        if (songSaved) {
            remove();
        } else {
            save();
        }
    };

    const save = async () => {
        try {
            currentUser.songs.push(songId);
            const perform = async () => {
                await Promise.all([
                    updateCurrentUser(currentUser),
                    saveSong(dispatch)
                ]);
            };
            perform();
        } catch (e) {
            console.log(`In saveSongButton.js, unable to perform save functionality: ${e}`);
        }
    };

    const remove = () => {
        try {
            const updatedUser = {
                ...currentUser,
                songs: currentUser.songs.filter(id => id !== songId)
            };
            const perform = async () => {
                await Promise.all([
                    updateCurrentUser(updatedUser),
                    unsaveSong(dispatch),
                    setCurrentUser(updatedUser)
                ]);
            };
            perform();
        } catch (e) {
            console.log(`In saveSongButton.js, unable to perform unsave functionality: ${e}`);
        }
    };

    if (currentUser) {
        return (
            <button className={btnStyle} onClick={handleClick}>
                <i className={`fa${(songSaved && 's') || 'r'} fa-heart pe-1`}></i>
                {(songSaved && 'Unsave') || 'Save'}
            </button>
        );
    }

    return null;
};

export default SaveSongButton;