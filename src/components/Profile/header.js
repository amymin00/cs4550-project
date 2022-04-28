import React from "react";
import FollowButton from "../../FollowButton";
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
                <h5 className='w-auto'>
                    <span className='h1'><strong>{profileUser.name}</strong></span>
                    <span className='ms-3 text-secondary profile-username'>
                        {profileUser.username}
                        {profileUser.creator && <i className='fa fa-check-circle fa-xs ms-2'/>}
                    </span>
                    {
                        isThisUser &&
                        <span className='h6 email-font-color ms-3'>
                            {profileUser.email}
                        </span>
                    }
                </h5>
                {
                    (
                        isThisUser &&
                        <Link to='/profile/edit' className='w-auto ms-5 btn btn-secondary float-end'>
                            Edit Profile
                        </Link>
                    ) ||
                    <FollowButton user={profileUser} />
                }
            </div>                
            <div className='row'>
                <div className='col-7 col-md-9'>
                    <p className='text-muted mb-0'>
                        {getBiographyText()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;