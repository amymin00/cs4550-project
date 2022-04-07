import mongoose from 'mongoose';

const { Schema } = mongoose;

// Thinking of changing this to verified?
const creatorsSchema = new Schema({
    name: String,
    username: String,
    biography: String,
    image: String,
    songs: [String], // might be the song ids taken from Spotify's API
    followers: [ObjectId] // not sure how to represent users idk
}, {collection: 'creators'});

export default creatorsSchema;