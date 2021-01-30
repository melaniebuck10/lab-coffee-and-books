'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/place');

router.get('/create', (req, res, next) => {
    res.render('places/create');
})

router.post('/create', (req, res, next) => {
    const data = req.body;
    Place.create({
        name: data.name,
        type: data.type
    })
    .then((place) => {
        res.redirect('/');
    })
    .catch((error) => {
        next(error);
    });
});

module.exports = router;