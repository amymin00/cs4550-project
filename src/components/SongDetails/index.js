import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findSong } from "../../services/song-service";

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

    useEffect(() => {
        const getTrack = async () => {
            const track = await findSong(songId);
            setSong(track);
        };
        getTrack();
    }, [songId]);

    if (song) {
        return (
            <div>TBD - details page for song {song.name} by {song.artists[0].name} here</div>
        )
    } else {
        return <div className="text-secondary">Loading...</div>
    }
}

export default SongDetails;