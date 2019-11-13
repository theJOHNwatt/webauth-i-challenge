const router = require('express').Router();
const requiresAuth = require('../auth/requires-auth-middleware.js');
const Users = require('./users-model.js');

router.get('/', requiresAuth, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;