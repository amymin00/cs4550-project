import mongoose from 'mongoose';

const { Schema } = mongoose;

const listenersSchema = new Schema({
    name: String,
    listenername: String,
    password: String,
    biography: String,
    image: String,
    playlists: [String],
    followers: [mongoose.Types.ObjectId],
    followees: [mongoose.Types.ObjectId],
}, {collection: 'listeners'});

export default listenersSchema;