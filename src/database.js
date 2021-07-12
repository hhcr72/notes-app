const mongoose = require('mongoose');

//creamos variables de conexion con varibles de entorno
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

//creamos conexion
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true 
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));