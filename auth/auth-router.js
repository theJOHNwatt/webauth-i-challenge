const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model.js');

router.post('/register', (req,res) => {
    const userInfo = req.body;

    bcrypt.hash(userInfo.password, 12, (err, hashedPassword) => {
        userInfo.password = hashedPassword;

        Users.add(userInfo)
            .then(saved => {
                res.status(200).json(saved);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });
});


router.post('/login', (req, res) => {
    const {username, password} = req.body;

    Users.findBy({username})
        .first()
        .then(user => {
            if (user) {
                res.status(200).json({message: `Welcome ${user.username}`})
            } else {
                res.status(401).json({message: `${user.username} not found`});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;