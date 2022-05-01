import { FIND_ALL_SONGS, SONG_SAVED, SONG_UNSAVED } from "../actions/song-actions";

export const songsReducer = (state = [], action) => {
    switch (action.type) {
        case FIND_ALL_SONGS:
            return action.songs;
        default:
            return state;
    }
}

export const songSavedReducer = (state = false, action) => {
    switch (action.type) {
        case SONG_SAVED:
            return true;
        case SONG_UNSAVED:
            return false;
        default:
            return state;
    }
}