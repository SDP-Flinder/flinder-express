const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const matchList = db.matchList;
const users = db.User;
const listings = db.Listing;

module.exports = {
    getAll,
    getSuccessMatchesForFlatee,
    getSuccessMatchesForListing,
    getPotentialMatchesForFlatee,
    getPotentialFlatAccountsForFlatee,
    getPotentialMatchesForListing,
    addListing,
    addFlatee,
    unmatch,
    delete: _delete
};

async function getAll() {
    return await matchList.find();
}

//this shows all profiles that the current profile has swiped right on (for chat purposes)
async function getSuccessMatchesForFlatee(flateeParam) {
    return await matchList.find({ flateeUsername: flateeParam.flateeUsername, matchState: 'matched' });
}

//this shows all profiles that the current profile has swiped right on (for chat purposes)
async function getSuccessMatchesForListing(listParam) {
    return await matchList.find({ listingID: listParam.listingID, matchState: 'matched' });
}

//appears as cards on main page for swiping 
async function getPotentialMatchesForFlatee(flateeParam) { 

    var cursor = listings.find({}).cursor();
    var tempList = [];
    for (var doc = await cursor.next(); doc != null; doc = await cursor.next()) 
    {
        var listingValid = await users.findOne({ _id: doc.flat_id });
        if (listingValid == null)
        {
            continue;
        }
        else
        {
            console.log("getPotentialMatchesForFlatee: " + listingValid.username);
            var tempMatch = await matchList.findOne({ flateeUsername: flateeParam.flateeUsername, listingID: doc._id });
            if (tempMatch == null) //when the current flat we're looking at isn't in the current flatee's matchList
            {
                console.log(doc._id);
                tempList.push(doc);
            }
            else if (doc._id == tempMatch._id)
            {
                if (tempMatch.matchState == 'flatee-pending')
                {
                    tempList.push(doc);
                }
            }   
        }
    }

    //if flat hasnt appeared user's matchlist
    //if flat appears on user's matchlist, but matchState == "flatee-pending"

    return tempList; //a card is not repeated and only show flats that swiped right/haven't swiped on flattee
}

//appears as cards on main page for swiping 
async function getPotentialFlatAccountsForFlatee(flateeParam) { 

    var cursor = listings.find({}).cursor();
    var tempList = [];
    for (var doc = await cursor.next(); doc != null; doc = await cursor.next()) 
    {
        var listingValid = await users.findOne({ _id: doc.flat_id });
        if (listingValid == null)
        {
            continue;
        }
        else
        {
            console.log("getPotentialFlatAccountsForFlatee: " + listingValid.username);
            var tempMatch = await matchList.findOne({ flateeUsername: flateeParam.flateeUsername, listingID: doc._id });
            if (tempMatch == null) //when the current flat we're looking at isn't in the current flatee's matchList
            {
                console.log(doc._id);
                tempList.push(listingValid);
            }
            else if (doc._id == tempMatch._id)
            {
                if (tempMatch.matchState == 'flatee-pending')
                {
                    tempList.push(listingValid);
                }
            }   
        }
    }

    //if flat hasnt appeared user's matchlist
    //if flat appears on user's matchlist, but matchState == "flatee-pending"

    return tempList; //a card is not repeated and only show flats that swiped right/haven't swiped on flattee
}

//appears as cards on main page for swiping 
async function getPotentialMatchesForListing(flatParam) { 

    var cursor = users.find({}).cursor();
    var tempList = [];
    for (var doc = await cursor.next(); doc != null; doc = await cursor.next()) 
    {
        if (doc.role == 'flatee' && doc.username != null)
        {
            var tempMatch = await matchList.findOne({ flateeUsername: doc.username, flatUsername: flatParam.listingID });
            if (tempMatch == null)
            {
                continue;
            }
            else if (doc.username == tempMatch.flateeUsername) //only flatees that have swiped right will be shown
            {
                if (tempMatch.matchState == 'list-pending')
                {
                    tempList.push(doc);
                }
            }
        }
        
    }

    //if flatee hasnt appeared user's matchlist
    //if flatee appears on user's matchlist, but matchState == "list-pending"

    return tempList; //a card is not repeated and only show flatees that swiped right on flat
}

//allows current flattee to add potential flat to list 
async function addListing(matchParam) { 

    let match = await matchList.findOne({ flateeUsername: matchParam.flateeUsername, listingID: matchParam.listingID })
    if (match)
    {
        if (match.matchState == 'flatee-pending')
        {
            matchParam.matchState = 'matched';
            matchParam.matchedDate = Date.now();
            Object.assign(match, matchParam);
        }
    }
    else
    {
        matchParam.matchState = 'list-pending';
        match = new matchList(matchParam);
    }

    //if flat hasnt swiped right on flattee, match.matchState = 'flat-pending';
    //if flat swiped right on flattee, match.matchState = 'matched';
    //if flat swiped left on flattee, the card shouldn't have appeared in flattee's page;

    // save match
    await match.save();
}

//allows current flat to add potential flatee to list 
async function addFlatee(matchParam) { 

    let match = await matchList.findOne({ flateeUsername: matchParam.flateeUsername, listingID: matchParam.listingID })
    if (match)
    {
        if (match.matchState == 'list-pending')
        {
            matchParam.matchState = 'matched';
            matchParam.matchedDate = Date.now();
            Object.assign(match, matchParam);
        }
    }
    else
    {
        matchParam.matchState = 'flatee-pending';
        match = new matchList(matchParam);
    }

    //if flatee hasnt swiped right on flat, match.matchState = 'flat-pending';
    //if flatee swiped right on flat, match.matchState = 'matched';
    //if flatee swiped left on flat the card shouldn't have appeared in flattee's page;

    // save match
    await match.save();
}

//this is invoked when one side of the two already matched profiles decide to unmatch; removes the opposite profile off
//their liked list OR when user swipes left
async function unmatch(matchParam) {
    
    let match = await matchList.findOne({ flateeUsername: matchParam.flateeUsername, listingID: matchParam.listingID })

    if (match == null)
    {
        match = new matchList(matchParam);
    }
    match.matchState = 'no-match';

    await match.save();
}

async function _delete(id) {
    await matchList.findByIdAndRemove(id);
}