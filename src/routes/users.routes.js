const {
    Router
} = require('express');

const router = Router(); //ejecuto objeto

const {
    renderSignupForm,
    signup,
    renderSigninForm,
    signin,
    logout
} = require('../controllers/users.controller'); //importo

//new user
router.get('/users/signup', renderSignupForm); //renderizo

router.post('/users/signup', signup);

//ingresar
router.get('/users/signin', renderSigninForm); //renderizo

router.post('/users/signin', signin); //renderizo


//salir
router.get('/users/logout', logout);


module.exports = router; 