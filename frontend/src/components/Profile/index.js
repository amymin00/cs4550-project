import React from "react";
import {Link} from "react-router-dom";
import Following from "./ListOfUsers/following";
import ListOfPostsItem from "../Posts/list-of-post-item";

const Profile = ({
  user = {
    name: "",
    username: "",
    password: "",
    creator: false,
    biography: "",
    image: "",
    songs: [],
    playlists: [],
    followers: [],
    followees: [],
  }
}) => {

  return (
      <div>
        <h2>{user.name}</h2>
        <h4>{user.username}
          <span className="d-inline-block">{user.creator && <i className="fa fa-check-circle"/>}
          </span></h4>
        <hr className="border-2 border-top border-dark" />
        <div className="d-inline-block">
          <h2 className="d-inline-block pe-3">following</h2>
          <h2 className="d-inline-block">followers</h2>
        </div>

        <ListOfPostsItem />

      </div>

  );
}

export default Profile;