import React, { useEffect, useState } from "react";
import { useProfile } from "../../contexts/profileContext";

const SaveSongButton = ({songId = '', className=''}) => {
    const btnStyle = `w-auto btn btn-info ${className}`;
    const [currentUser, setCurrentUser] = useState();
    const [isSaved, setIsSaved] = useState(false);
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
        if (currentUser) {
            setIsSaved(currentUser.songs.includes(songId));
        }
    }, [currentUser]);

    const handleClick = () => {
        if (isSaved) {
            remove();
        } else {
            save();
        }
    };

    const save = async () => {
        try {
            const saveSong = async () => {
                currentUser.songs.push(songId);
                // Below is to trigger the useEffect for currentUser
                const updatedUser = {
                    ...currentUser,
                    songs: currentUser.songs
                }
                await updateCurrentUser(updatedUser);
                setCurrentUser(updatedUser);
            };
            saveSong();
        } catch (e) {
            console.log(`In saveSongButton.js, unable to perform save functionality: ${e}`);
        }
    };

    const remove = () => {
        try {
            const removeSong = async () => {
                const updatedUser = {
                    ...currentUser,
                    songs: currentUser.songs.filter(id => id !== songId)
                };
                // console.log(updatedUser.son)
                await updateCurrentUser(updatedUser);
                setCurrentUser(updatedUser);
            };
            removeSong();
        } catch (e) {
            console.log(`In saveSongButton.js, unable to perform unsave functionality: ${e}`);
        }
    };

    if (currentUser) {
        return (
            <button className={btnStyle} onClick={handleClick}>
                <i className={`fa${(isSaved && 's') || 'r'} fa-heart pe-1`}></i>
                {(isSaved && 'Unsave') || 'Save'}
            </button>
        );
    }

    return null;
};

export default SaveSongButton;