const { verifyToken } = require('../utilities/jwt');
const { Lister } = require('../../db/mongo/index');

module.exports = async function auth(req, res, next) {
    try {
        req.token = req.headers['authorization'].split(' ')[1];
        req.decoded = await verifyToken(req.token);
        req.user = await Lister.findOne({ _id: req.decoded.payload._id });
        if (req.user.tokens.includes(req.token))
            return next();
        else throw new Error();
    }
    catch (ex) {
        return res.status(401).json({ error: "could not verify token" });
    }
}