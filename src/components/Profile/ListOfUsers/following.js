import React from "react";
import ListOfUsersItem from "./list-of-users-item";

const Following = ({
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
  return(
      <ul className="list-group">
        <li className="list-group-item"><p className="fw-bold mb-0">Following</p></li>
        {
          // filter users first
          user.followees.map(user => {
            return(<ListOfUsersItem user={user}/>);
          })
        }
      </ul>
  );
}
export default Following;