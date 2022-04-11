import mongoose from 'mongoose';

const { Schema } = mongoose;

// groups = like subreddit
const groupsSchema = new Schema({
    name: String,
    topic: String,
    members: [ObjectId], // list of users
    posts: [ObjectId],
}, {collection: 'groups'});

export default groupsSchema;