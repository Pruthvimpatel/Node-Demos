import {body,param} from 'express-validator';

export const createProductSchema = [
    body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .escape().withMessage('Name contain invalid characters'),

    body('price')
    .isFloat({gt: 0 })
    .withMessage('Price must be positive number ')
    .toFloat(),

    body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .escape().withMessage('Description contains invalid character')
];

export const updateProductSchema  = [
  param('id').isInt().withMessage('Product ID must be an integer'),
  body('name').optional().notEmpty().withMessage('Product name is required'),
  body('price').optional().isFloat({gt: 0}).withMessage('Price must be positive number'),
  body('description').optional().notEmpty().withMessage('Description is required')
];