import React, { useEffect, useState } from "react";
import * as service from "../services/user-service";
import { useProfile } from "../contexts/profileContext";

const FollowButton = ({user = {
    _id: '0',
    name: 'bill',
    username: 'bill-webdev',
    password: 'p@ssword',
    creator: false,
    biography: 'hello',
    image: '',
    songs: [],
    playlists: [],
    followers: [],
    following: [],
}, className=''}) => {

    const btnStyle = `w-auto btn btn-secondary ${className}`;
    const [otherUser, setOtherUser] = useState(user);
    const [currentUser, setCurrentUser] = useState();
    const [isFollowingUser, setIsFollowingUser] = useState(false);
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
            setIsFollowingUser(currentUser.following.includes(otherUser._id));
        }
    }, [currentUser]);

    const handleClick = () => {
        if (isFollowingUser) {
            unfollowUser();
        } else {
            followUser();
        }
    };

    const followUser = async () => {
        try {
            const updateLoggedInUser = async () => {
                currentUser.following.push(otherUser._id);
                // Below is to trigger the useEffect for currentUser
                const updatedUser = {
                    ...currentUser,
                    following: currentUser.following
                }
                await updateCurrentUser(updatedUser);
                setCurrentUser(updatedUser);
            };
            const updateOtherUser = async () => {
                otherUser.followers.push(currentUser._id);
                await service.updateUser(otherUser);
                setOtherUser(otherUser);
            };
            const performFollow = async () => {
                await Promise.all([
                    updateLoggedInUser(),
                    updateOtherUser(),
                ]);
            };
            performFollow();
        } catch (e) {
            console.log(`In FollowButton index.js, unable to perform follow functionality: ${e}`);
        }
    };

    const unfollowUser = () => {
        try {
            const updateLoggedInUser = async () => {
                const updatedUser = {
                    ...currentUser,
                    following: currentUser.following.filter(id => id !== otherUser._id)
                };
                const updated = await updateCurrentUser(updatedUser);
                setCurrentUser(updated);
            };
            const updateOtherUser = async () => {
                const updatedUser = { 
                    ...otherUser,
                    followers: otherUser.followers.filter(id => id !== currentUser._id)
                };
                await service.updateUser(updatedUser);
                setOtherUser(otherUser);
            };
            const performUnfollow = async () => {
                await Promise.all([
                    updateLoggedInUser(),
                    updateOtherUser(),
                ]);
            };
            performUnfollow();
        } catch (e) {
            console.log(`In FollowButton index.js, unable to perform follow functionality: ${e}`);
        }
    };

    if (currentUser && currentUser._id !== otherUser._id) {
        return (
            <button className={btnStyle} onClick={handleClick}>
                {(isFollowingUser && 'Unfollow') || 'Follow'}
            </button>
        );
    }

    return null;
};

export default FollowButton;