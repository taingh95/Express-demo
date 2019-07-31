const generateUniqueId = require('generate-unique-id');
const db = require('../db')

module.exports = function(req,res,next ) {
    var sessionID = req.signedCookies.sessionId
    if(!sessionID) {
            var sessionsId = generateUniqueId.init({
                length: 32,
                useLetters: false
            })
            res.cookie('sessionId', sessionsId, {
                signed: true
            })
        db.get('sessions').push({
            id: sessionsId
        }).write();
    }
    let productObj = Object.keys(db.get("sessions").find({ id: sessionID }).get("cart").value())    
    let numberOfP = 0;
    for (let index in productObj) {
        numberOfP += db.get("sessions").find({ id: sessionID }).get("cart." + productObj[index]).value()
    }
    res.locals.productNumber = numberOfP;
    next();
}