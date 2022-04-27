import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { useProfile } from '../../contexts/profileContext';
import ListOfPostsItem from "../Posts/list-of-post-item";
import UserList from "../user-list";
import Loading from "../Loading";
import * as service from "../../services/user-service";

/**
 * TODOS:
 * 1. Find out how to get profile for anyone
 * 2. get posts/comments made by this user
 * 3. get this user's songs
 */


const Profile = () => {
    // const { userId } = useParams();
    const { currentUser } = useProfile();
    const [profileUser, setProfileUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    console.log(`currentUser: ${currentUser.name}`);

    useEffect(() => {
        if (currentUser && currentUser._id === userId) {
            setProfileUser(currentUser);
        } else {
            const getUser = async () => {
                const user = await service.findUserById(userId);
                setProfileUser(user);
            }
            getUser();
        }
    }, [currentUser, userId]);

    useEffect(() => {
        const findUsersFollowers = async () => {
            const followers = await service.findUsersFollowers(currentUser);
            setFollowers(followers);
        };
        const findUsersFollowing = async () => {
            const following = await service.findUsersFollowers(currentUser);
            setFollowing(following);
        };
        findUsersFollowers();
        findUsersFollowing();
    }, [currentUser]);

    console.log(`profileUser: ${profileUser}`);

    // console.log(`profileUser: ${profileUser}`);

    // console.log(`user profile name here: ${profileUser.name}`);

    if (profileUser) {
        return (
            <div>
                <div className="row justify-content-between align-items-center">
                    <h5 className="w-auto">
                        <span className="h1"><strong>{currentUser.name}</strong></span>
                        <span className="text-secondary profile-username">
                            &nbsp; {currentUser.username} {currentUser.creator && <i className="fa fa-check-circle fa-xs"/>}
                        </span>
                    </h5>
                    <Link to="/profile/edit" className="w-auto">
                        <button className="ms-5 btn btn-primary float-end">Edit Profile</button>
                    </Link>
                </div>
                <hr className="border-2 border-top border-secondary me-5" />
                <div className="row">
                    <div className="col-3">
                        <h5 className="p-0">Followers</h5>
                        {(followers.length > 0 && <UserList users={followers} />) ||
                         (followers.length === 0 && <p>{currentUser.username} has no followers</p>)}
    
                        <h5 className="p-0 mt-3">Following</h5>
                        {(following.length > 0 && <UserList users={following} />) ||
                         (following.length === 0 && <p>{currentUser.username} is not following anyone</p>)}
                    </div>
                    <div className="col-6">
                        <ListOfPostsItem />
                    </div>
                    <div className="col-3">
                        <h5 className="p-0">Saved Songs</h5>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loading />
    }
}

export default Profile;