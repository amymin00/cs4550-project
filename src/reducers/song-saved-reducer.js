import { SAVED_SONG } from "../actions/song-actions";

const songSavedReducer = (state = false, action) => {
    switch (action.type) {
        case SAVED_SONG:
            return action.songs;
        default:
            return state;
    }
}

export default songSavedReducer;