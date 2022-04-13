import * as groupsDao from '../daos/groups.js';

const createGroup = async (req, res) => {
    const newCroup = req.body;
    newCroup.likes = 0;
    const insertedCroup = await groupsDao.createGroup(newCroup);
    res.json(insertedCroup);
}

const findAllGroups = async (req, res) => {
    const groups = await groupsDao.findAllGroups();
    res.json(groups);
}  

const updateGroup = async (req, res) => {
    const groupdIdToUpdate = req.params.id;
    const updatedCroup = req.body;
    const status = await groupsDao.updateGroup(groupdIdToUpdate, updatedCroup);
    res.send(status);
}

const deleteGroup = async (req, res) => {
    const groupdIdToDelete = req.params.id;
    const status = await groupsDao.deleteGroup(groupdIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/groups', createGroup);
    app.get('/api/groups', findAllGroups);
    app.put('/api/groups/:id', updateGroup);
    app.delete('/api/groups/:id', deleteGroup);
}