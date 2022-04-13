import mongoose from 'mongoose';

const { Schema } = mongoose;

// groups = like subreddit
const groupsSchema = new Schema({
    name: String,
    topic: String,
    members: [mongoose.Types.ObjectId], // list of listeners
    posts: [mongoose.Types.ObjectId],
}, {collection: 'groups'});

export default groupsSchema;