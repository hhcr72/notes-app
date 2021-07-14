const { Router } = require('express');

const router = Router(); //ejecuto objeto

const { renderIndex, renderAbout } = require('../controllers/index.controller'); //importo en renderizado

router.get('/', renderIndex); //rendesizo index

router.get('/about', renderAbout); //renderizo about

//router.use('*', e404); //error 400
//router.use(function(req, res, next) {
//    res.status(404).render('/404');
//});


module.exports = router;