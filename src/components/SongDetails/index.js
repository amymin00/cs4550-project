import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findSong } from "../../services/song-service";
import Loading from "../Loading";
import SaveSongButton from "./saveSongButton";
import PostList from "../Posts";
import CreatePost from "../Posts/createPost";
import { findPostsBySong } from "../../actions/post-actions";
import { findUsersSongs } from "../../actions/song-actions";
import toMinutesSeconds from "../../utils/toMinutesSeconds";
import { useProfile } from "../../contexts/profileContext";
import './style.css';
import { useDispatch, useSelector } from "react-redux";

const SongDetails = () => {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const usersSongs = useSelector(state => state.songs);
    const songsPosts = useSelector(state => state.posts);
    const songSaved = useSelector(state => state.songSaved);
    const [song, setSong] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { checkLoggedIn } = useProfile();

    useEffect(() => {
        const check = async () => {
            try {
                const user = await checkLoggedIn();
                const setLoggedInInfo = async () => {
                    await Promise.all([
                        setIsLoggedIn(true),
                        findUsersSongs(dispatch, user),
                    ]);
                };
                setLoggedInInfo();
            } catch (e) {
                console.log(`Error loading SongDetails page: ${e}`);
            }
        };
        const getTrack = async () => {
            if (!song) {
                const track = await findSong(songId);
                setSong(track);
            }
        };

        const loadPage = async () => {
            await Promise.all([
                check(),
                getTrack(),
                findPostsBySong(dispatch, songId)
            ]);
        };
        loadPage();
    }, [dispatch]);

    if (song && usersSongs) {
        return (
            <>
                <div className="row m-0 mt-3">
                    <div className="col-12 col-md-6 p-0 rounded-top-left">
                        <div className="row m-0 justify-content-center img-height bg-light-yellow p-3 pe-lg-5 rounded-top-left">
                            <img src={song.album.cover} className="p-0 rounded h-auto w-auto fit-image shadow"/>
                        </div>
                        <div className="bg-light-yellow ps-5 p-3 pt-0 pt-md-3 position-relative d-block d-md-none">
                            <h1 className="text-primary">
                                <strong>{song.name}</strong>
                                {song.explicit && <span className="h4 text-danger fw-bold"> (explicit)</span>}
                            </h1>
                            <h4 className="text-muted mb-2">
                                by {song.artists.map(a => a.name).join(', ')} ({song.album.released.substring(0,4)})
                            </h4>
                            <hr className='border-2 border-top border-dark' />
                            <h5 className="text-muted">Album: {song.album.name}</h5>
                            <h5 className="text-muted">Duration: {toMinutesSeconds(song.length_ms)}</h5>
                            <SaveSongButton songId={songId} className="position-absolute end-0 bottom-0 m-3" />
                        </div>
                        <CreatePost className="mt-4 me-3 me-lg-5"
                                    specificSong={song} canPost={songSaved} /> 
                    </div>
                    <div className="col-12 col-md-6 p-0 overflow-auto">
                        <div className="img-height bg-light-yellow ps-3 ps-lg-5 rounded-top-right p-3 position-relative d-none d-md-block">
                            <h1 className="text-primary">
                                <strong>{song.name}</strong> 
                                {song.explicit && <span className="h4 text-danger fw-bold"> (explicit)</span>}
                            </h1>
                            <h4 className="text-muted mb-2">
                                by {song.artists.map(a => a.name).join(', ')} ({song.album.released.substring(0,4)})
                            </h4>
                            <hr className='border-2 border-top border-dark' />
                            <h5 className="text-muted">Album: {song.album.name}</h5>
                            <h5 className="text-muted">Duration: {toMinutesSeconds(song.length_ms)}</h5>
                            <SaveSongButton songId={songId} className="position-absolute end-0 bottom-0 me-3 mb-3" />
                        </div>
                        <div className="ms-3 ms-lg-5 mb-1">
                            <h4 className="my-2 my-md-3">Latest Discussions</h4>
                            {
                                (
                                    songsPosts.length > 0 &&
                                    <PostList posts={songsPosts} hideImages={true} />
                                ) || 
                                (
                                    (isLoggedIn && `Be the first to post about ${song.name}!`) ||
                                    `There are no posts about ${song.name}`
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <Loading />
    }
}

export default SongDetails;