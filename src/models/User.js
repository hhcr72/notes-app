const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}   
}, {
    timestamps: true //agrega automaticamente a la bd la fecha de creacion y modifiocacion
});

//creamos metodo para encriptar password
UserSchema.methods.encrypPassword = async password => {
    const salt = await bcrypt.genSalt(10); //cantidad de ejecuciones
    return await bcrypt.hash(password,salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema, 'User'); //exportamos el modelo