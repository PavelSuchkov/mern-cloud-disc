import jwt from 'jsonwebtoken'
import config from "config";

const authMiddleware = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]  // Authorization or authorztion ?????
        if(!token){
            return res.status(401).json({message: 'Auth error'})
        }
        const decoded = jwt.verify(token, config.get('secretKey'))
        req.user = decoded
        next()
    }catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
}

export default authMiddleware