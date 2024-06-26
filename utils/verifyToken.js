import jwt from "jsonwebtoken"
import { createError } from "./error.js"

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const verifyToken = (req, res,next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not authenticated!."))
    }

    jwt.verify(token, JWT_SECRET,(err, user) =>{
        if (err) return next(createError(403, "Token does not valid!"));
        req.user = user;
        next()
    });
   
};

export const verifyUser = (req, res, next) => {
    verifyToken(req,res, next, () => {
        if(req.user.id === req.params.id) {
            next()
        } else {
            if (err) return next(createError(403, "You are not authorized"));
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req,res, next, () => {
        if(req.user.role === 'admin') {
            res.send("Welcome Admin");
            next()
        } else {
            if (err) return next(createError(403, "You are not authorized"));
        }
    })
}