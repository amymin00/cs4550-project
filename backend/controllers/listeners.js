import * as listenersDao from '../daos/listeners.js';

const createListener = async (req, res) => {
    const newListener = req.body;
    newListener.likes = 0;
    const insertedListener = await listenersDao.createListener(newListener);
    res.json(insertedListener);
}

const findAllListeners = async (req, res) => {
    const listeners = await listenersDao.findAllListeners();
    res.json(listeners);
}  

const updateListener = async (req, res) => {
    const ListenerdIdToUpdate = req.params.id;
    const updatedListener = req.body;
    const status = await listenersDao.updateListener(listenerdIdToUpdate, updatedListener);
    res.send(status);
}

const deleteListener = async (req, res) => {
    const listenerdIdToDelete = req.params.id;
    const status = await listenersDao.deleteListener(listenerdIdToDelete);
    res.send(status);
}   

export default app => {
    app.post('/api/listeners', createListener);
    app.get('/api/listeners', findAllListeners);
    app.put('/api/listeners/:id', updateListener);
    app.delete('/api/listeners/:id', deleteListener);
}