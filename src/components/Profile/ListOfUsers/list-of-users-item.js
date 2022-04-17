const ListOfUsersItem = ({
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
          <button className="btn btn-primary rounded-pill mt-2 mb-2">
            Unfollow
          </button>
        </div>
      </ul>
  );
}
export default ListOfUsersItem;