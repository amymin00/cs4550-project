import { findSongsById } from '../services/song-service';

export const FIND_USERS_SONGS = 'FIND_USERS_SONGS';
export const SONG_SAVED = 'SONG_SAVED';
export const SONG_UNSAVED = 'SONG_UNSAVED';

export const findUsersSongs = async (dispatch, user) => {
    const songs = await findSongsById(user.songs);
    dispatch({
        type: FIND_USERS_SONGS,
        songs
    });
}

export const saveSong = async dispatch => {
    dispatch({type: SONG_SAVED});
}

export const unsaveSong = async dispatch => {
    dispatch({type: SONG_UNSAVED});
}