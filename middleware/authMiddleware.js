const jwt = require('jsonwebtoken')

exports.authMiddleware = async (req,res,next)=>{
const authHeader = req.header('Authorization');
if(!authHeader) return res.status(400).json({error:"unauthorized"});

try{
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
}catch (error) {
    res.status(401).json({ error: 'Invalid token' });
}
};