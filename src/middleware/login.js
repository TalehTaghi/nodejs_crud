const jwt = require('jsonwebtoken');

const login = (req, res, next) => {

    try {

        const token = req.header("Authorization").replace('Bearer ', '');
        const ret = jwt.verify(token, 'test123'); //secret password
        req.user = ret;
        next();

    } catch(e) {

        req.error = {
            data : e,
            status: false
        }

        next();

    }

}


module.exports = login;