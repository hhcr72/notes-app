const Note = require("../models/Note");

const notesCtrl = {}; //lo guardo en un objeto

//new note
notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
    //res.send('add')
};

notesCtrl.createNewNote = async (req, res) => {
    //console.log(req.body)
    const {title, description} = req.body;
    const newNote = new Note({title , description});
    newNote.user = req.user.id; //guardo el user en la nota
    await newNote.save();
    req.flash('success_msg', 'Note Add Successfully');
    res.redirect('/notes');
};

//get all notes
notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}).lean(); //lean() corrige error de muestra de datos
    res.render('notes/all-notes', { notes });
};

//edit note
notesCtrl.renderEditNote = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash('err_msg', 'Not Authorized');
        return res.redirect('/notes');
    } //validacion que la nota sea del usuario
    res.render('notes/edit-note', { note });
};

notesCtrl.UpdateNote =  async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
};

//deleted note
notesCtrl.deleteNote = async (req, res) => { 
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes') 
};



module.exports = notesCtrl;