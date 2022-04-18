import {useDispatch} from "react-redux";
import {deleteUser} from "../../actions/user-actions";

const ListOfUsersItem = ({
  user = {
    name: "bill",
    username: "bill-webdev",
    password: "p@ssword",
    creator: false,
    biography: "hello",
    image: "",
    songs: [],
    playlists: [],
    followers: [],
    followees: [],
  }
}) => {
  const dispatch = useDispatch();
  return (
      <ul className="list-group-item">
        <div className="d-inline-block">
          <img className="rounded-circle me-3" src={user.image}
               height="48px"
               width="48px"/>
          <span className="d-inline-block align-middle">
               <span className="d-inline-block pe-5">
                 <p className="fw-bold mb-0">{user.name}
                   {user.creator && <i className="fa fa-check-circle"/>}
                 </p>
               </span>
               <span className="d-inline">
                 {/*Link to user's profile -- "/profile/{profileId}"*/}
                 <p className=" mb-0">@{user.username}</p>
               </span>
          </span>
        </div>
        <div className="float-end">
          {/* TODO unfollow functionality */}
          <button className="btn btn-danger rounded-pill mt-2 mb-2"
                  onClick={() => deleteUser(
                      dispatch, user)}>
            Delete
          </button>
        </div>
      </ul>
  );
}
export default ListOfUsersItem;