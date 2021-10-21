const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Photo = db.Photo;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Photo.find();
}

async function getById(id) {
    return await Photo.findById(id);
}

async function create(file, userParam) {

    const photo = new Photo(userParam);
    photo.photo = file.path;

    // save user
    await photo.save();
}

async function update(id, userParam) {
    const photo = await Photo.findById(id);

    // copy userParam properties to user
    Object.assign(photo, userParam.body);

    console.log('user data is', user);

    return await user.save();
}

async function _delete(id) {
    await Photo.findByIdAndRemove(id);
}