
const indexCtrl = {}; //lo guardo en un objeto

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

module.exports = indexCtrl;