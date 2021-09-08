const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Listing = db.Listing;

module.exports = {
    getAll,
    getOwned,
    getById,
    addListing,
    update,
    delete: _delete
};

async function getAll() {
    return await Listing.find();
}

async function getOwned() {
    return await Listing.find();
}

async function getById(id) {
    return await Listing.findById(id);
}

async function addListing(listingparam) {
    // const flatID = listingparam.flatID;
    const description = listingparam.description;
    const utilities = listingparam.utilities;
    const rent = Number(listingparam.rent);
    const rentUnits = listingparam.rentUnits;
    const roomAvailable = Date.parse(listingparam.roomAvailable);

    const newListing = new Listing({
        // flatID,
        description,
        utilities,
        rent,
        rentUnits,
        roomAvailable
    });

    return await newListing.save();
}

async function update(id, listingparam) {
    return await Listing.findById(id)
        .then(listing => {
            listing.description = listingparam.body.description;
            listing.utilities = listingparam.body.utilities;
            listing.rent = Number(listingparam.body.rent);
            listing.rentUnits = listingparam.body.rentUnits;
            listing.roomAvailable = Date.parse(listingparam.body.roomAvailable);

            listing.save();
        });
}

async function _delete(id) {
    await Listing.findByIdAndRemove(id);
}