import axios from 'axios';

const API_URI = process.env.REACT_APP_LOCAL_API_URI || process.env.REACT_APP_REMOTE_API_URI;
const SONGS_API = `${API_URI}/songs`;

export const findSong = async id => {
    const response = await axios.get(`${SONGS_API}/${id}`);
    const song = parseTrack(response.data);
    return song;
}

export const searchForSongs = async query => {
    const formattedQuery = query.toLowerCase().replaceAll(' ', '-');
    const response = await axios.get(`${SONGS_API}/search/${formattedQuery}`);
    const songs = parseSearchTrackResults(response.data);
    return songs;
}

const parseTrack = track => {
    const album = {
        id: track.album.id,
        name: track.album.name,
        cover: track.album.images[0].url,
        released: track.album.release_date,
    };
    const artists = track.artists.map(a => {
        return {
            id: a.id, 
            name: a.name,
        }
    });

    return {
        id: track.id,
        name: track.name,
        artists: artists,
        length_ms: track.duration_ms,
        album: album,
    };
};

const parseSearchTrackResults = data => {
    const songs = data.tracks.items;
    return songs.map(d => parseTrack(d));
};