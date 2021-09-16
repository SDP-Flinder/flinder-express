const express = require('express');
const router = express.Router();
const matchService = require('./match.service');
const {authorize} = require('_helpers/authorize')
const matchState = require('_helpers/match-state');

// routes
router.get('/getSuccessMatches/:id', authorize(), getSuccessMatches);
router.get('/:id', authorize(), getPotentialFlatMatches);
router.post('/:id', authorize(), addFlat);
router.patch('/:inSessionUsername/:id', authorize(), updateMatchState);
router.patch('/unmatch/:inSessionUsername/:id', authorize(), unmatch);

module.exports = router;

function getSuccessMatches(req, res, next) {

    matchService.getSuccessMatches()
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function getPotentialFlatMatches(req, res, next) {

    matchService.getSuccessMatches()
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function addFlat(req, res, next) {
    matchService.addFlat(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateMatchState(req, res, next) {

    matchService.updateMatchState(req.params.id, req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function unmatch(req, res, next) {

    matchService.unmatch(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
