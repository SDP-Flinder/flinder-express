const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const matchList = db.matchList;
const Flat = db.Flat;

module.exports = {
    getSuccessMatches,
    getPotentialFlatMatches,
    addFlat,
    updateMatchState,
    unmatch,
};

//this shows all profiles that the current profile has swiped right on (for chat purposes)
async function getSuccessMatches() {
    return await matchList.find({ matchState: 'matched' });
}

//appears as cards on main page for swiping 
async function getPotentialFlatMatches() {
    return await Flat.find(); //adjust so that a card is not repeated and only show flats that swiped right/haven't swiped on flattee
}

//allows current user to add potential match to list 
async function addFlat(matchParam) {

    const match = new matchList(matchParam);

    //if flat hasnt swiped right on flattee, match.matchState = 'flat-pending';
    //if flat swiped right on flattee, match.matchState = 'matched';
    //if flat swiped left on flattee, the card shouldn't have appeared in flattee's page;


    // save match
    await match.save();
}

//updates matchState 
async function updateMatchState(id, targetParam) {
    const match = await matchList.findById(id);

    // copy userParam properties to user
    Object.assign(match, targetParam);

    await match.save();
}

//this is invoked when one side of the two already matched profiles decide to unmatch; removes the opposite profile off
//their liked list
async function unmatch(id) {
    const match = await matchList.findById(id);

    match.matchState = 'no-match';

    await match.save();
}
