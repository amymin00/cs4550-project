import React from "react";
import {Link} from "react-router-dom";

const EditProfile = ({
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
        <Link to="/profile">
          <button className="btn btn-danger float-end">Cancel</button>
        </Link>
        <Link to="/profile">
          <button className="btn btn-outline-primary float-end">Save</button>
          {/*TODO add onClick for updating user*/}
        </Link>
        <form>
          <div className="form-outline mb-4">
            <input type="text" id="registerName" className="form-control"
                   placeholder={user.name}/>
            <label className="form-label" htmlFor="registerName">Name</label>
          </div>

          <div className="form-outline mb-4">
            <input type="text" id="registerUsername" className="form-control"
                   placeholder={user.username}/>
            <label className="form-label"
                   htmlFor="registerUsername">Username</label>
          </div>
          <div className="form-outline mb-4">
            <input type="password" id="registerPassword"
                   placeholder="password"
                   className="form-control"/>
            <label className="form-label"
                   htmlFor="registerPassword">Password</label>
          </div>
        </form>

      </div>

  );
}

export default EditProfile;