const {
    Router
} = require('express');
const { registerDecorator } = require('handlebars');

const {isAuthenticated} = require('../helpers/auth'); //importo modulo para validar autenticacion

const router = Router(); //ejecuto objeto

const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditNote,
    UpdateNote,
    deleteNote
} = require('../controllers/notes.controller'); //importo



//new notes
router.get('/notes/add', isAuthenticated, renderNoteForm); //renderizo

router.post('/notes/new-note', isAuthenticated, createNewNote);


//get all notes
router.get('/notes/', isAuthenticated, renderNotes);

//update notes
router.get('/notes/edit/:id', isAuthenticated, renderEditNote);

router.put('/notes/edit/:id', isAuthenticated, UpdateNote);

//delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);


//errores 400
//router.use(function(req, res){
   // res.status(400);
    //let URLerror = req.originalUrl;
    //res.render('400', {texoError: URLerror});
//});
//router.get('*', e400);


module.exports = router; 