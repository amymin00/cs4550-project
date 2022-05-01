import React from "react";
import FollowButton from "../FollowButton";
import { Link } from "react-router-dom";

const Header = ({isThisUser = false, 
                profileUser = {
                    name: "",
                    username: "",
                    password: "",
                    creator: false,
                    biography: "",
                    image: "",
                    songs: [],
                    playlists: [],
                    followers: [],
                    following: [],
}}) => {
    const getBiographyText = () => {
        let bio = '';

        if (profileUser.biography) {
            return profileUser.biography;
        } else if (isThisUser) {
            bio = 'You have';
        } else {
            bio = 'This user has';
        }
        bio = `${bio} no biography.`;

        if (isThisUser) {
            bio = `${bio} Go to Edit Profile to add one!`;
        }

        return bio;
    };

    return (
        <div id='profile-header'>
            <div className='row justify-content-between align-items-center'>
                <h5 className='col w-auto text-wrap'>
                    <span className='h1 text-nowrap'><strong>{profileUser.name}</strong></span>
                    <span className='ms-md-3 text-secondary profile-username d-block d-md-inline'>
                        {profileUser.username}
                        {profileUser.creator && <i className='fa fa-check-circle fa-xs ms-2'/>}
                    </span>
                    {
                        isThisUser &&
                        <span className='h6 email-font-color ms-lg-3 d-block d-lg-inline'>
                            {profileUser.email}
                        </span>
                    }
                </h5>
                <div className="col">
                    {
                        (
                            isThisUser &&
                            <Link to='/profile/edit' className='w-auto ms-sm-5 mb-3 mb-sm-0 btn btn-secondary float-sm-end text-nowrap'>
                                Edit Profile
                            </Link>
                        ) ||
                        <FollowButton user={profileUser} className='w-auto ms-sm-5 mb-3 mb-sm-0 float-sm-end' />
                    }
                </div>
            </div>                
            <div className='row'>
                <div className='col-12 col-lg-9 col-xl-8'>
                    <p className='text-muted mb-0'>
                        {getBiographyText()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;