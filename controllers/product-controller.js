const db = require('../db')


module.exports.index = (req,res) => {
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;
    let begin = (page - 1) * perPage;
    let end = begin + perPage;
    let pageNumber = Math.ceil(db.get('products').value().length/perPage);
    res.render('products/index', {
        products: db.get('products').value().slice(begin,end),
        pageNumber
    })
}