const express = require('express');
const router = express.Router();
const chatService = require('./flat.service');
const {authorize} = require('../_helpers/authorize')
const Role = require('../_helpers/role');

// routes
router.post('/create', authorize(), create)
router.get('/', authorize(), getMine);
router.get('/all', authorize(Role.Admin), getAll);
router.get('/:chatid', authorize(),  getById);
router.put('/:chatid', authorize(), update);
router.delete('/:chatid', authorize(), _delete);

module.exports = router;

function create(req, res, next) {
    chatService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    chatService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getMine(req, res, next) {
    chatService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    chatService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to update other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    chatService.update(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to delete other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    chatService.delete(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}