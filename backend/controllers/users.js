import * as usersDao from '../daos/users.js';

const createUser = async (req, res) => {
    const newUser = req.body;
    newUser.likes = 0;
    const insertedUser = await usersDao.createUser(newUser);
    res.json(insertedUser);
}

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.json(users);
}  

const updateUser = async (req, res) => {
    const userdIdToUpdate = req.params.tid;
    const updatedUser = req.body;
    const status = await usersDao.updateUser(userdIdToUpdate, updatedUser);
    res.send(status);
}   

const deleteUser = async (req, res) => {
    const userdIdToDelete = req.params.tid;
    const status = await usersDao.deleteUser(userdIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.put('/api/users/:tid', updateUser);
    app.delete('/api/users/:tid', deleteUser);
}