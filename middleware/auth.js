const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    const token = req.header('auth-token');

    if(!token) {
        return res.status(401).json({msg: 'Login or register to see the content.'});
    }
    
    try{
        const decoded = jwt.verify(token, 'xFiles');
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({msg: "Invalid token"});
    }
}