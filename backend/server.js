import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import userController from './controllers/listeners.js';
import postsController from './controllers/posts.js';
import creatorsController from './controllers/creators.js';
import groupsController from './controllers/groups.js';

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PW;
const uri = `mongodb+srv://${username}:${password}@cluster0.jb1wc.mongodb.net/webdev?retryWrites=true&w=majority`;
console.log(`uri here :) - ${uri}`);
mongoose.connect(uri);

// Use middleware
const app = express();
app.use(cors());
app.use(express.json());

// Add endpoints for various APIs
userController(app);
postsController(app);
creatorsController(app);
groupsController(app);

app.listen(process.env.PORT || 4000);