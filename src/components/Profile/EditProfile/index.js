import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../../contexts/profileContext";
import refreshPage from "../../../utils/refreshPage";

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
    following: [],
  },
}) => {
  const { updateCurrentUser } = useProfile();
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        name: nameRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };
      await updateCurrentUser(user);
      refreshPage();
      navigate("/");
    } catch (e) {
      alert("Unable to edit profile with given user credentials. Try again");
    }
  };

  return (
    <div>
      <Link to="/profile">
        <button className="btn btn-danger float-end">Cancel</button>
      </Link>
      <Link to="/profile">
        <button
          className="btn btn-outline-primary float-end"
          onClick={handleEdit}
        >
          Save
        </button>
        {/*TODO add onClick for updating user*/}
      </Link>
      <form>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="registerName"
            className="form-control"
            placeholder={user.name}
            ref={nameRef}
          />
          <label className="form-label" htmlFor="registerName">
            Name
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="registerUsername"
            className="form-control"
            placeholder={user.username}
            ref={usernameRef}
          />
          <label className="form-label" htmlFor="registerUsername">
            Username
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            id="registerPassword"
            placeholder="password"
            className="form-control"
            ref={passwordRef}
          />
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
