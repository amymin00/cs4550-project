import * as listenersDao from '../daos/listeners.js';

const createUser = async (req, res) => {
    const newUser = req.body;
    newUser.likes = 0;
    const insertedUser = await listenersDao.createUser(newUser);
    res.json(insertedUser);
}

const findAlllisteners = async (req, res) => {
    const listeners = await listenersDao.findAlllisteners();
    res.json(listeners);
}  

const updateUser = async (req, res) => {
    const userdIdToUpdate = req.params.tid;
    const updatedUser = req.body;
    const status = await listenersDao.updateUser(userdIdToUpdate, updatedUser);
    res.send(status);
}   

const deleteUser = async (req, res) => {
    const userdIdToDelete = req.params.tid;
    const status = await listenersDao.deleteUser(userdIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/listeners', createUser);
    app.get('/api/listeners', findAlllisteners);
    app.put('/api/listeners/:tid', updateUser);
    app.delete('/api/listeners/:tid', deleteUser);
}