const express = require('express');
const bodyParser = require('body-parser');
const Promotion = require('../models/promotion');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.get((req, res, next) => {
    Promotion.find()
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Promotion.create(req.body)
    .then (promotion => {
        console.log('Campsite Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

promotionRouter.route('/:promotionsId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionsId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.promotionsId}`);
})
.put((req, res, next) => {
   Promotion.findByIdAndUpdate(req.params.promotionsId, {
       $set: req.body
   }, { new: true})
   .then(promotion => {
       res.statuCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promotion);
   })
   .catch(err => next(err));
})
.delete((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionsId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = promotionRouter;