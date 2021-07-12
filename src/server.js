const express = require('express'); //requiero el framework del servidor
const path = require('path'); //modulo para obtener el path
const exphbs = require('express-handlebars'); //requiero motor de plantillas
const morgan = require('morgan');
const methodOverride = require('method-override'); //para hacer otro tipo de peticiones
const flash = require('connect-flash'); 
const session = require('express-session'); 
const passport = require('passport');

//initializations
const app = express(); //lo ejecuto
require('./config/passport');

//settings
app.set('port', process.env.PORT || 3000); //establesco el puerto en caso que este disponible
app.set('views',path.join(__dirname, 'views')); //establesco la ruta de la carpeta views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
})); //definimos el motor de plantillas
app.set('view engine', '.hbs'); //establecemos el motor de plantillas

//middlewares
app.use(morgan('dev')); //muestra peticiones
app.use(express.urlencoded({extended: false})); //convierte datos a json
app.use(methodOverride('_method')); 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})); //configuracion de session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.err_msg = req.flash('err_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; //guardamos usuario
    next();
});


//Routes
//app.get('/', (req, res) => { res.render('index'); });
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));


//static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app; //lo exporto