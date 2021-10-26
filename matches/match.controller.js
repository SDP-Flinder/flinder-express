const express = require('express');
const router = express.Router();
const matchService = require('./match.service');
const {authorize} = require('../_helpers/authorize')
const matchState = require('../_helpers/match-state');
const Role = require('../_helpers/role');

// routes
router.get('/', authorize(), getAll);
router.get('/getSuccessMatchesForFlatee/:id', authorize(), getSuccessMatchesForFlatee);
router.get('/getSuccessMatchesForListing/:id', authorize(), getSuccessMatchesForListing);
router.get('/potentialMatchesForFlatee', authorize(), getPotentialMatchesForFlatee);
router.get('/potentialMatchesForListing', authorize(), getPotentialMatchesForListing);
router.post('/addListing', authorize(), addListing);
router.post('/addFlatee', authorize(), addFlatee);
router.put('/unmatch', authorize(), unmatch);
router.get('/findFlatee/:id', authorize(), findFlatee);
router.delete('/:id', authorize(), _delete);

// Messaging
router.post('/message', authorize(), message);
router.get('/messages', authorize(), getAllMessages);
router.get('/message/:messageId', authorize(), getMessageById);

module.exports = router;

function message(req, res, next) {
    matchService.createMessage(req.body)
        .then((message) => res.json({message}))
        .catch(err => next(err));
}

function getAllMessages(req, res, next) {
    matchService.getAllMessages()
        .then((messages) => res.json(messages))
        .catch(err => next(err));
}

function getMessageById(req, res, next) {
    matchService.getById(req.params.messageId)
        .then((message) => message ? res.json(message) : res.json([]))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    matchService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getSuccessMatchesForFlatee(req, res, next) {

    matchService.getSuccessMatchesForFlatee(req.params.id)
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function getSuccessMatchesForListing(req, res, next) {

    matchService.getSuccessMatchesForListing(req.params.id)
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function getPotentialMatchesForFlatee(req, res, next) {

    matchService.getPotentialMatchesForFlatee(req.query)
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

function findFlatee(req, res, next) {

  matchService.findFlatee(req.params.id)
      .then(user => user ? res.json(user) : res.sendStatus(404))
      .catch(err => next(err));
}

function _delete(req, res, next) {
    matchService.delete(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
