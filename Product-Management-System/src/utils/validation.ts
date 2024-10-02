import Joi from 'joi';
//USER-SCHEMA
export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

export const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required()
});

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
})

export const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required()
})

export const updatePasswordSchema = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
})



// //PRODUCT-SCHEMA
// export const createProductSchema = Joi.object({
//     name:Joi.string().required(),
//     price:Joi.number().required(),
//     description: Joi.string().max(500).required()
// })


// export const updateProductSchema = Joi.object({
//     name:Joi.string().required(),
//     price:Joi.number().required(),
//     description: Joi.string().max(500).required()
// })

