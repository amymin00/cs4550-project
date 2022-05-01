import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../../contexts/profileContext";
import refreshPage from "../../../utils/refreshPage";
import validName from "../../../utils/validName";

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
    const { updateCurrentUser, currentUser } = useProfile();
    const nameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const biographyRef = useRef();
    const navigate = useNavigate();

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            validName(nameRef.current.value);

            if (nameRef.current.value && usernameRef.current.value && 
                emailRef.current.value && passwordRef.current.value) {
                    const user = {
                        ...currentUser,
                        name: nameRef.current.value,
                        username: usernameRef.current.value,
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                        biography: biographyRef.current.value
                    };
                    await updateCurrentUser(user);
                    
                    navigate(`/profile/${usernameRef.current.value}`);
                    refreshPage();
            }
        } catch (e) {
            alert(`Unable to edit profile with given information. Try again ${e}`);
        }
    };

    return (
        <div>
            <h2 className="d-flex justify-content-center mb-3">Edit Profile</h2>
            <form className="mx-5" onSubmit={handleEdit}>
                <div className="form-outline mb-4">
                    <input required
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
                    <input required
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
                    <input required
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
                    <input required
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
                <div className="row w-auto float-end me-5">
                    <button type="submit"
                            className="col w-auto btn btn-outline-primary me-3">
                        Save
                    </button>
                    <button className="col w-auto btn btn-danger"
                            onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
