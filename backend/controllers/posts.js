import * as postsDao from '../daos/posts.js';

const createPost = async (req, res) => {
    const newPost = req.body;
    newPost.likes = 0;
    const insertedPost = await postsDao.createPost(newPost);
    res.json(insertedPost);
}

const findAllPosts = async (req, res) => {
    const posts = await postsDao.findAllPosts();
    res.json(posts);
}  

const updatePost = async (req, res) => {
    const postdIdToUpdate = req.params.id;
    const updatedPost = req.body;
    const status = await postsDao.updatePost(postdIdToUpdate, updatedPost);
    res.send(status);
}

const deletePost = async (req, res) => {
    const postdIdToDelete = req.params.id;
    const status = await postsDao.deletePost(postdIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/posts', createPost);
    app.get('/api/posts', findAllPosts);
    app.put('/api/posts/:id', updatePost);
    app.delete('/api/posts/:id', deletePost);
}