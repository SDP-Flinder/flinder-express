const express = require('express');
const router = express.Router();
const photoService = require('./photo.service');
const {authorize} = require('../_helpers/authorize');
const Role = require('../_helpers/role');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');

    },
    filename: function(req, file,cb) {
        cb(null, Date.now() + file.originalname.replace(/\s/g, '_'));
    }
});

//This doesn't work
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);     //accept the file
    } else {
        //reject
        cb(null, false);
    }

};

const upload = multer({
    storage: storage,
});

// routes
router.post('/upload', upload.single('profileImage') , create);
router.get('/', authorize(Role.Admin), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(),  getById);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

/**
 * Calls userService to create new user, then calls authenticate() to log user in
 */
function create(req, res, next) {
    console.log(req.file);
    photoService.create(req.file, req.body)
        .then((msg) => (msg == 'user-created') ? authenticate((req.body.username, req.body.password), res, next) : res.json({message: msg}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    photoService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    photoService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    // const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    //    return res.status(401).json({ message: 'Unauthorized' });
    // }

    photoService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    const currentPhoto = req.Photo;
    const id = req.params.id;

    // // only allow admins to access other user records
    // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    photoService.update(req.params.id, req)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    photoService.delete(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}