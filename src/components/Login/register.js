import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {createUser} from "../../actions/user-actions";


const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creator, setCreator] = useState(false);
  const user = {
    name: name,
    username: username,
    password: password,
    creator: creator,
    biography: "About me",
    image: "",
    songs: [],
    playlists: [],
    followers: [],
    followees: [],
  }
  // TODO create user functionality


  return (
      <div>
        <div className="d-inline-block mt-2">
          <Link to="/home">
            <button className="btn btn-primary float-end">Home</button>
          </Link>
        </div>
        <div className="container mt-3">
          {/*https://mdbootstrap.com/docs/standard/extended/login/*/}
          <h1 className="text-center text-primary mb-5">Register</h1>
          <form>
            <div className="form-outline mb-4">
              <input required 
                     type="text" id="registerName" 
                     className="form-control"
                     placeholder="John Smith"
                     onChange={(event) => setName(event.target.value)}/>
              <label className="form-label" htmlFor="registerName">Name</label>
            </div>

            <div className="form-outline mb-4">
              <input required
                     type="text" id="registerUsername" 
                     className="form-control"
                     placeholder="johnsmith"
                     onChange={(event) => setUsername(event.target.value)}/>
              <label className="form-label"
                     htmlFor="registerUsername">Username</label>
            </div>

            <div className="form-outline mb-4">
              <input required
                     type="password" 
                     id="registerPassword"
                     placeholder="password"
                     className="form-control"
                     onChange={(event) => setPassword(event.target.value)}/>
              <label className="form-label"
                     htmlFor="registerPassword">Password</label>
            </div>
            <div className="form-outline mb-4">
              <select required
                      className="form-select"
                      onChange={e => setCreator(e.target.value)}>
                <option selected>Select account type</option>
                <option value={false}>Listener</option>
                <option value={true}>Artist</option>
              </select>
            </div>

            <button type="submit"
                    className="btn btn-primary btn-block mb-3"
                    onClick={() => createUser(dispatch, user)}>
              Register
            </button>

            <div className="text-center">
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
  )
};

export default Register