import mongoose from 'mongoose';

const { Schema } = mongoose;

const creatorsSchema = new Schema({
    name: String,
    listenername: String,
    biography: String,
    image: String,
    songs: [String], // song ids taken from Spotify's Web API
    followers: [mongoose.Types.ObjectId]
}, {collection: 'creators'});

export default creatorsSchema;