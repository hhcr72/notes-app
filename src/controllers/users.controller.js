const User = require("../models/User");
const passport = require('passport');

const userCtrl = {}; //lo guardo en un objeto

//new user
userCtrl.renderSignupForm = (req, res) => {
    res.render('users/signup')
};

userCtrl.signup = async (req, res) => {
    //console.log(req.body)
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if (password != confirm_password) {
        errors.push({text: 'Password do not match'});
    }
    if (password.length < 4) {
        errors.push({text: 'Paswords must be at least 4 characters'});
    }
    if (errors.length > 0 ) {
        res.render('users/signup', {errors, name, email});
    }else{
        //verificamos si el correo ya esta registrado
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            errors.push({text: 'The Email is already in use'});
            res.render('users/signup', {errors, name, email});
        } else { //registramos usuario
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encrypPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered')
            res.redirect('/users/signin');
        };

    }
};

userCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin')
};
 
userCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/signin');
};

module.exports = userCtrl;