const { Router } = require('express');

const router = Router(); //ejecuto objeto

const { renderIndex, renderAbout } = require('../controllers/index.controller'); //importo en renderizado

router.get('/', renderIndex); //rendesizo index

router.get('/about', renderAbout); //renderizo about

module.exports = router;