import Joi from 'joi';

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required()
        .error(new Error('Invalid username')),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,64}$'))
        .required()
        .error(new Error('Invalid password')),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .error(new Error('Invalid email'))
});

export default schema;