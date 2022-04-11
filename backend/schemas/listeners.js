import mongoose from 'mongoose';

const { Schema } = mongoose;

const listenersSchema = new Schema({
    name: String,
    username: String,
    password: String,
    biography: String,
    image: String,
    playlists: [String],
    followers: [ObjectId],
    followees: [ObjectId],
}, {collection: 'listeners'});

export default listenersSchema;