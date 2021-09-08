const express = require('express');
const router = express.Router();
const listingService = require('./listing.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.post('/add', addListing)
router.get('/', authorize(Role.Flat), getOwned);
router.get('/all', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(Role.Flat), update);
router.delete('/:id', authorize(Role.Flat), _delete);

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
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to update other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    listingService.update(req.params.id)
        .then(listing => listing ? res.json(listing) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to delete other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    listingService.delete(req.params.id)
        .then(listing => listing ? res.json(listing) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports = router;