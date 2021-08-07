const router = require('express').Router();
const { findAll, findOne, create, update, deleteAll, deleteOne } = require('../../../service/user');
const { validatorCreate, validatorUpdate } = require('../../../validation/user');

router.get('/', findAll);
router.get('/:user_id', findOne);
router.post('/', validatorCreate, create);
router.put('/:user_id', validatorUpdate, update);
router.delete('/:user_id', deleteOne);
router.delete('/', deleteAll);

module.exports = router