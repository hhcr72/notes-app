require('dotenv').config(); //importo variables de entorno
const app = require('./server'); //importo la creacion del servidor
require('./database'); //importo conexion a bd


//inicio server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});


