import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.send('Possessions');
});


router.post('/', (req, res) => {
    res.send('Possession created');
});


router.put('/:libelle', (req, res) => {
    res.send(`Possession ${req.params.libelle} updated`);
});

router.post('/:libelle/close', (req, res) => {
    res.send(`Possession ${req.params.libelle} closed`);
});

module.exports = router;
