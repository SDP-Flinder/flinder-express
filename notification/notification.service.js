const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Notification = db.User;

module.exports = {
    getAllUsersNotifications,
    addNotification,
    read,
    delete: _delete
};

async function getAllUsersNotifications(userID) {
    return await Notification.find({ userID: userID, read: false });
}

async function addNotification(notificationParams) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'username-"' + userParam.username + '"-taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function read(id) {
    const user = await User.findById(id);

    console.log("userParams are "+userParam.body);
    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    console.log(userParam.body);
    // copy userParam properties to user
    Object.assign(user, userParam.body);

    return await user.save();
}

async function _delete(id) {
    await Notification.findByIdAndRemove(id);
}