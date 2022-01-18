const express = require('express');
const router = express.Router();
const games = require('./../../games.json');


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/game/fourchette', (req, res) => {
    res.render('fourchette')
})

router.get('/game/diceroller', (req, res) => {
    res.render('diceRoller')
})

module.exports = router;