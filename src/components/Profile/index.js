import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import ListOfPostsItem from "../Posts/list-of-post-item";
import UserList from "../user-list";
import { findUserById } from "../../services/user-service";
import { useProfile } from '../../contexts/profileContext';

const Profile = () => {
    const { userId } = useParams();
    const { currentUser } = useProfile();
    // const [profileUser, setProfileUser] = useState(null);

    // console.log(`currentUser: ${currentUser.name}`);

    // useEffect(() => {
    //     if (currentUser._id === userId) {
    //         setProfileUser(currentUser);
    //     } else {
    //         // const getUser = async () => {
    //         //     const user = await findUserById(userId);
    //         //     setProfileUser(user);
    //         // }
    //         // getUser();
    //         console.log('something went wrong!');
    //     }
    // }, [currentUser, userId]);

    // console.log(`user profile name here: ${profileUser.name}`);

    return (
        <div>Profile page to be fixed soon :(</div>
    );

    // if (profileUser) {
    //     return (
    //         <div>
    //             <h2>{profileUser.name}</h2>
    //             <h4>{profileUser.username}
    //                 <span className="d-inline-block">
    //                     {profileUser.creator && <i className="fa fa-check-circle"/>}
    //                 </span>
    //             </h4>
    //             <Link to="/editprofile">
    //                 <button className="btn btn-primary float-end">Edit Profile</button>
    //             </Link>
    //             <hr className="border-2 border-top border-dark" />
    //             <div className="d-inline-block">
    //                 <h2 className="d-inline-block pe-3">following</h2>
    //                 <UserList />
    //                 <h2 className="d-inline-block">followers</h2>
    //             </div>
    //             <ListOfPostsItem />
    //         </div>
    //     );
    // } else {
    //     return (
    //         <div>Oops!</div>
    //     )
    // }
    
}

export default Profile;