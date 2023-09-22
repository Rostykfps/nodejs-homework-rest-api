const express = require('express');

const ctrl = require('../../controllers/users');

const { validateBody, authenticate } = require('../../middlewares');

const schemas = require('../../schemas/users');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.post('/current', authenticate, ctrl.getCurrent);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription,
);

module.exports = router;
