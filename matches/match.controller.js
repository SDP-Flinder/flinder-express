const express = require('express');
const router = express.Router();
const matchService = require('./match.service');
const {authorize} = require('../_helpers/authorize')
const matchState = require('../_helpers/match-state');

// routes
router.get('/', authorize(), getAll);
router.get('/getSuccessMatchesForFlatee', authorize(), getSuccessMatchesForFlatee);
router.get('/getSuccessMatchesForListing', authorize(), getSuccessMatchesForListing);
router.get('/potentialMatchesForFlatee', authorize(), getPotentialMatchesForFlatee);
router.get('/getPotentialFlatAccountsForFlatee', authorize(), getPotentialFlatAccountsForFlatee);
router.get('/potentialMatchesForListing', authorize(), getPotentialMatchesForListing);
router.post('/addListing', authorize(), addListing);
router.post('/addFlatee', authorize(), addFlatee);
router.put('/unmatch', authorize(), unmatch);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    matchService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getSuccessMatchesForFlatee(req, res, next) {

    matchService.getSuccessMatchesForFlatee(req.query)
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function getSuccessMatchesForListing(req, res, next) {

    matchService.getSuccessMatchesForListing(req.query)
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function getPotentialMatchesForFlatee(req, res, next) {

    matchService.getPotentialMatchesForFlatee(req.query)
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function getPotentialFlatAccountsForFlatee(req, res, next) {

    matchService.getPotentialFlatAccountsForFlatee(req.query)
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function getPotentialMatchesForListing(req, res, next) {

    matchService.getPotentialMatchesForListing(req.query)
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function addListing(req, res, next) {
    matchService.addListing(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function addFlatee(req, res, next) {
    matchService.addFlatee(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function unmatch(req, res, next) {

    matchService.unmatch(req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    matchService.delete(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
