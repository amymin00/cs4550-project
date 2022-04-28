import React from "react";
import * as service from "../services/user-service";
import { useProfile } from "../contexts/profileContext";

const FollowButton = ({isLoggedIn = false, 
                        thisUser = {
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
                        }, 
                        otherUser = {
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
                        }}) => {

    const followingUser = thisUser.following.includes(otherUser._id);
    const { updateCurrentUser } = useProfile();

    const handleFollowUser = async () => {
        try {
            thisUser.following.push(otherUser._id);
            await updateCurrentUser(thisUser);
            otherUser.followers.push(thisUser._id);
            await service.updateUser(otherUser);
        } catch (e) {
            console.log(`In FollowButton index.js, unable to perform follow functionality: ${e}`);
        }
    };

    const handleUnfollowUser = () => {
        return;
    };

    if (isLoggedIn) {
        if (followingUser) {
            return (
                <button className='w-auto ms-5 btn btn-secondary float-end float-md-start'
                                onClick={handleUnfollowUser}>
                    Unfollow
                </button>
            ); 
        } else {
            return (
                <button className='w-auto ms-5 btn btn-secondary float-end float-md-start'
                            onClick={handleFollowUser}>
                    Follow
                </button>
            ); 
        }
    }

    return null;
};

export default FollowButton;