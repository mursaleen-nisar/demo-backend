const Joi = require('joi');

// Server side validation using joi module

const signupValidation = (req, res, next) => {

    // first create schema of validation

    const schema = Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    // second use 'validate' keyword for req.body (json data of schema)

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({ message: 'bad request', error });
    }

    // third if no error then resolve promise using next(); 
    next();
}

const loginValidation = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'bad request', error });
    }

    next();
}

module.exports = {signupValidation, loginValidation};

// we will use these validation on router of signup and login (AuthRouter.js)