import * as creatorsDao from '../daos/creators.js';

const createCreator = async (req, res) => {
    const newCreator = req.body;
    newCreator.likes = 0;
    const insertedCreator = await creatorsDao.createCreator(newCreator);
    res.json(insertedCreator);
}

const findAllCreators = async (req, res) => {
    const creators = await creatorsDao.findAllCreators();
    res.json(creators);
}  

const updateCreator = async (req, res) => {
    const creatordIdToUpdate = req.params.id;
    const updatedCreator = req.body;
    const status = await creatorsDao.updateCreator(creatordIdToUpdate, updatedcreator);
    res.send(status);
}

const deleteCreator = async (req, res) => {
    const creatordIdToDelete = req.params.id;
    const status = await creatorsDao.deleteCreator(creatordIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/creators', createCreator);
    app.get('/api/creators', findAllCreators);
    app.put('/api/creators/:id', updateCreator);
    app.delete('/api/creators/:id', deleteCreator);
}