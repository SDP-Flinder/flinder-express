const express = require('express');
const router = express.Router();
const listingService = require('./listing.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.post('/add', addListing)
router.get('/', getOwned);
router.get('/all', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

function addListing(req, res, next) {
    listingService.addListing(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    listingService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getOwned(req, res, next) {
    listingService.getById(req.user.sub)
        .then(listing => listing ? res.json(listing) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    listingService.getById(req.params.id)
        .then(listing => listing ? res.json(listing) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    // const currentUser = req.user;
    // const id = req.params.id;

    // only allow admins to update other user records
    // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    //Returns "404 not found, despite actually updating the entry"
    listingService.update(req.params.id, req)
        .then(listing => listing ? res.json(listing) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    // const currentUser = req.user;
    // const id = parseInt(req.params.id);

    // only allow admins to delete other user records
    // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    listingService.delete(req.params.id)
        .then(listing => listing ? res.json(listing) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports = router;