import axios from 'axios';

const API_URI = process.env.REACT_APP_API_URI || 'https://infinite-reef-07217.herokuapp.com/api';
const SONGS_API = `${API_URI}/songs`;

export const searchForSongs = async query => {
    const formattedQuery = query.toLowerCase().replaceAll(' ', '-');
    const response = await axios.get(`${SONGS_API}/search/${formattedQuery}`);
    const songs = parseSearchTrackResults(response.data);
    return songs;
}

const parseSearchTrackResults = data => {
    // console.log(data);
    const songs = data.tracks.items;
    // const song = songs[0];
    // console.log(songs);
    // return song;

    const parsedSongs = songs.map(d => {
        // console.log(d);
        const album = {
            id: d.album.id,
            name: d.album.name,
            cover: d.album.images[0].url,
            released: d.album.release_date,
        };
        const artists = d.artists.map(a => {
            return {
                id: a.id, 
                name: a.name,
            }
        });
        return {
            id: d.id,
            name: d.name,
            artists: artists,
            length_ms: d.duration_ms,
            album: album,
        };
    });

    return parsedSongs;
};
