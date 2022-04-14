const ListOfPostsItem = ({
  post = {
    _id: "",
    title: "",
    author: "",
    timestamp: 0,
    song: "",
    text: "",
    likes: 0,
    comments: 0,
  }
}) => {
  return (
      <ul className="list-group-item">
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Song name</h5>
              <h6 className="card-subtitle">Artist name</h6>
              <p className="card-text">Text</p>
              <div>
                <p className="pe-3 d-inline-block"><span><i className="far fa-comment"></i></span>  Comments</p>
                <p className="pe-3 ps-5 d-inline-block"><span><i className="far fa-heart text-red"></i></span> Likes </p>
              </div>
            </div>
        </div>
      </ul>
  );
}
export default ListOfPostsItem;

/*
spotify api-- track image
song name and artist name and album cover
"images": [
      {
        "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
        "height": 300,
        "width": 300
      }
    ],
 */