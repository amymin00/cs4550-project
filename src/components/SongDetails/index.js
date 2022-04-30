import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findSong } from "../../services/song-service";
import Loading from "../Loading";
import SaveSongButton from "./saveSongButton";
import PostList from "../Posts";
import CreatePost from "../Posts/createPost";
import { findPostBySong } from "../../services/post-service";
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
                <div className="row mt-3">
                    <div className="col p-0">
                        <div className="row justify-content-center proj-vh-75 bg-warning pe-5 proj-song-details">
                            <img src={song.album.cover} className="card-img-top h-auto w-auto"/>
                        </div>
                        <CreatePost className="mt-4" /> 
                    </div>
                    <div className="col p-0 overflow-auto">
                        <div className="proj-vh-75 bg-warning ps-5 proj-song-details">
                            <h1 className="text-secondary">
                                <strong>{song.name}</strong>
                                by {song.artists.map(a => a.name).join(', ')}
                            </h1>
                            <h4>album: {song.album.name}</h4>
                            <h4>released: {song.album.released}</h4>
                            <h4>length (ms): {song.length_ms}</h4>
                            <SaveSongButton songId={songId} className="float-end" />
                        </div>
                        <h4 className="">Latest Discussions</h4>
                        <PostList posts={songsPosts} className='mt-4' />
                    </div>
                </div>
            </>
        );
    } else {
        return <Loading />
    }
}

export default SongDetails;