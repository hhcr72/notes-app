
const indexCtrl = {}; //lo guardo en un objeto

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

//error 400
//indexCtrl.e404 = (req, res) => {
    
//res.status(404);
//.render('/404');
    //res.status(400);
    //let URLerror = req.originalUrl;
    //res.render('404');
//};


module.exports = indexCtrl;