import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import ListOfPostsItem from "../Posts/list-of-post-item";
import UserList from "../user-list";
import { findUserById } from "../../services/user-service";
import { useProfile } from '../../contexts/profileContext';

const Profile = () => {
    const { userId } = '9jgGRfZWjZ27uQGQhK4In'; // useParams();
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const user = await findUserById(userId);
        setUser(user);
    }
    useEffect(getUser, [getUser]);

    console.log(`user profile name here: ${user}`);

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>{user.username}
                <span className="d-inline-block">
                    {user.creator && <i className="fa fa-check-circle"/>}
                </span>
            </h4>
            <Link to="/editprofile">
                <button className="btn btn-primary float-end">Edit Profile</button>
            </Link>
            <hr className="border-2 border-top border-dark" />
            <div className="d-inline-block">
                <h2 className="d-inline-block pe-3">following</h2>
                <UserList />
                <h2 className="d-inline-block">followers</h2>
            </div>
            <ListOfPostsItem />
        </div>

    );
}

export default Profile;