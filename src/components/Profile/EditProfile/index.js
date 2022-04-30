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
    const emailRef = useRef();
    const passwordRef = useRef();
    const biographyRef = useRef();
    const navigate = useNavigate();

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const user = {
                name: nameRef.current.value,
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                biography: biographyRef.current.value
            };
            await updateCurrentUser(user);
            navigate(`/profile/${usernameRef.current.value}`);
            refreshPage();
        } catch (e) {
            alert(" Unable to edit profile with given user credentials. Try again");
        }
    };

    return (
        <div>
            <h2 className="d-flex justify-content-center mb-3">Edit Profile</h2>
            <form className="mx-5" onSubmit={handleEdit}>
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
                        type="email"
                        id="registerName"
                        className="form-control"
                        placeholder={user.email}
                        ref={emailRef}
                    />
                    <label className="form-label" htmlFor="registerName">
                        Email
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
                <div className="form-outline mb-4">
                    <textarea rows="3" cols="50" 
                              className="form-control"
                              ref={biographyRef}
                              placeholder='Give yourself a new biography'>
                    </textarea>
                    <label className="form-label" htmlFor="registerBiography">
                        Biography
                    </label>
                </div>
            </form>
            <div className="row w-auto float-end me-5">
                <button className="col w-auto btn btn-outline-primary me-3">
                    Save
                </button>
                <button className="col w-auto btn btn-danger"
                        onClick={() => navigate(-1)}>
                    Cancel
                </button>
            </div>
            
        </div>
    );
};

export default EditProfile;
