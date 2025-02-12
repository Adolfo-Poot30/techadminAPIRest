const express = require('express');
const usersWithoutAccountController = require('./usersWithoutAccountController');
const { authenticate } = require('../../core/middlewares/authMiddleware');
const {roleMiddleware} = require('../../core/middlewares/roleMiddleware');
const router = express.Router();


router.post('/register',  authenticate, roleMiddleware, usersWithoutAccountController.createClienteSinCuenta);

/*router.get('/:id', authenticate, getUserById);

router.put('/:id', authenticate, updateUser);

router.delete('/:id', authenticate, deleteUser);
*/
module.exports = router;
