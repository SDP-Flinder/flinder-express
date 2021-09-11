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

async function getOwned(id) {
    console.log(id);
    const listings = await Listing.find({ flat_id: id } );
    // console.log(listings);
    return listings;
}

async function getById(id) {
    return await Listing.findById(id);
}

async function addListing(listingparam) {
    const flat_id = listingparam.flat_id;
    const description = listingparam.description;
    const utilities = listingparam.utilities;
    const rent = Number(listingparam.rent);
    const rentUnits = listingparam.rentUnits;
    const roomAvailable = Date.parse(listingparam.roomAvailable);

    const newListing = new Listing({
        flat_id,
        description,
        utilities,
        rent,
        rentUnits,
        roomAvailable,
        active: true
    });

    return await newListing.save();
}

async function update(id, listingparam) {
    const listing = await Listing.findById(id);

    console.log(listing);

    listing.description = listingparam.body.description;
    listing.utilities = listingparam.body.utilities;
    listing.rent = Number(listingparam.body.rent);
    listing.rentUnits = listingparam.body.rentUnits;
    listing.roomAvailable = Date.parse(listingparam.body.roomAvailable);
    listing.active = listingparam.body.active;

    console.log(listing);

   return await listing.save();

    // const updateListing = await Listing.findById(id)
    //     .then(listing => {
    //         listing.description = listingparam.body.description;
    //         listing.utilities = listingparam.body.utilities;
    //         listing.rent = Number(listingparam.body.rent);
    //         listing.rentUnits = listingparam.body.rentUnits;
    //         listing.roomAvailable = Date.parse(listingparam.body.roomAvailable);

    //         listing.save()
    //     });

    // return await updateListing;
}

async function _delete(id) {
    return await Listing.findByIdAndRemove(id);
}