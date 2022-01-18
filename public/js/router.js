const express = require('express');
const router = express.Router();
const games = require('./../../games.json');

router.get('/', (req, res) => {
    res.render('index', {
        gamesVue: games,
    })
})

router.get('/game/fourchette', (req, res) => {
    res.render('fourchette', {
        gamesVue: games,

    })
})

router.get('/game/diceroller', (req, res) => {
    res.render('diceRoller', {
        gamesVue: games,
    })
})

module.exports = router;