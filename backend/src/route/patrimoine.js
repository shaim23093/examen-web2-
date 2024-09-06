import {Router} from 'express';
const router = Router(); 


router.get('/:date', (req, res) => {
    res.send(`Valeur du patrimoine pour la date ${req.params.date}`);
});


router.post('/range', (req, res) => {
    res.send('Patrimoine value');
});


module.exports = router;