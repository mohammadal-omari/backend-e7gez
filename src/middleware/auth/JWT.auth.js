const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error,"   error")
        return res.status(401).json({
            message: 'Invalid Token'
        });
    }
};