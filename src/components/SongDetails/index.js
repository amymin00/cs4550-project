import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findSong } from "../../services/song-service";
import Loading from "../Loading";
import SaveSongButton from "./saveSongButton";
import PostList from "../Posts";
import CreatePost from "../Posts/createPost";
import { findPostBySong } from "../../services/post-service";
import toMinutesSeconds from "../../utils/toMinutesSeconds";
import { useProfile } from "../../contexts/profileContext";
import './style.css';

/**
 * song object: 
 * {
        id: track.id,
        name: track.name,
        artists: [list of {
            id: a.id, 
            name: a.name,
        }],
        length_ms: track.duration_ms,
        album: {
            id: track.album.id,
            name: track.album.name,
            cover: track.album.images[0].url,
            released: track.album.release_date,
        },
    }
 */

const SongDetails = () => {
    const { songId } = useParams();
    const [song, setSong] = useState(null);
    const [songsPosts, setSongsPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { checkLoggedIn } = useProfile();
    
    useEffect(() => {
        const check = async () => {
            try {
                await checkLoggedIn();
                setIsLoggedIn(true);
            } catch (e) {
                console.log(`Error loading SongDetails page: ${e}`);
            }
        }
        check();
    }, []);

    useEffect(() => {
        const getTrack = async () => {
            const track = await findSong(songId);
            setSong(track);
        };
        getTrack();
    }, [songId]);

    useEffect(() => {
        if (song) {
            const getPosts = async () => {
                const posts = await findPostBySong(songId);
                setSongsPosts(posts);
            }
            getPosts();
        }
    }, [song]);

    if (song) {
        return (
            <>
                <div className="row m-0 mt-3">
                    <div className="col p-0 rounded-top-left">
                        <div className="row justify-content-center vh-75 bg-light-yellow p-3 pe-5 rounded-top-left">
                            <img src={song.album.cover} className="p-0 rounded h-auto w-auto fit-image shadow"/>
                        </div>
                        <CreatePost className="mt-4 me-5"
                                    specificSong={song} /> 
                    </div>
                    <div className="col p-0 overflow-auto">
                        <div className="vh-75 bg-light-yellow ps-5 rounded-top-right p-3 position-relative">
                            <h1 className="text-primary">
                                <strong>{song.name}</strong>
                            </h1>
                            <h4 className="text-muted mb-2">
                                by {song.artists.map(a => a.name).join(', ')} ({song.album.released.substring(0,4)})
                            </h4>
                            <hr className='border-2 border-top border-dark' />
                            <h5 className="text-muted">Album: {song.album.name}</h5>
                            <h5 className="text-muted">Duration: {toMinutesSeconds(song.length_ms)}</h5>
                            <SaveSongButton songId={songId} className="position-absolute end-0 bottom-0 me-3 mb-3" />
                        </div>
                        <div className="ms-5">
                            <h4 className="my-4">Latest Discussions</h4>
                            {
                                (
                                    songsPosts.length > 0 &&
                                    <PostList posts={songsPosts} />
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