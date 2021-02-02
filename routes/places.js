'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/place');

router.get('/places', (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render('places/index', { places: places });
    })
    .catch((error) => {
      next('error');
    });
});

router.get('/create', (req, res, next) => {
  res.render('places/create');
});

router.get('/places/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      res.render('places/show', { place: place });
    })
    .catch((error) => {
      next('error');
    });
});

router.post('/create', (req, res, next) => {
  const data = req.body;
  Place.create({
    name: data.name,
    type: data.type
  })
    .then((place) => {
      res.redirect('/places/index');
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/places/:id', (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    Place.findByIdAndUpdate(id, {
      name: data.name,
      type: data.type,
    }, {new: true})
      .then((place) => {
        res.redirect('/places');
      })
      .catch((error) => {
        next('error');
      });
  });
  

module.exports = router;
