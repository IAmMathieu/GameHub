const express = require('express');
const router = express.Router();
const games = require('./../../games.json');


router.get('/', (req, res) => {
    res.render('index', {
        gamesVue: games,
    })
    console.log(__dirname);
})

router.get('/game/:nomDuJeu', (req, res) => {
    const askedGame = req.params.nomDuJeu;

    let foundGame = null;
    // on récupère depuis la page retournée par le navigateur (en parm)
    // l'id de la route du jeu vers lequel on veut aller.
    // attention on doit qd même vérifier que celle-ce soit valide sinon on retourne une page 404.

    for (let game of games) {
        if (game.name === askedGame) {
            foundGame = game;
            break;
        }
    }

        if (foundGame) {
            res.render(foundGame.name, {
            gamesVue: games,
            })
        } else {
            res.status(404);
            res.render('404', {
                gamesVue: games,
            });
        }
    }
);

router.get('*', (req, res) => {
    res.status(404);
    res.render('404', {
        gamesVue: games,
    });
})

// router.get('/game/fourchette', (req, res) => {
//     res.render('fourchette', {
//         gamesVue: games,
//     })
// })

// router.get('/game/diceroller', (req, res) => {
//     res.render('diceRoller', {
//         gamesVue: games,
//     })
// })

module.exports = router;