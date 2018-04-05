const
	express = require('express'),
	usersRouter = new express.Router(),
	usersCtrl = require('../controllers/users.js'),
	{verifyToken} = require('../serverAuth.js')

usersRouter.route('/')
	.get(usersCtrl.index)
	.post(usersCtrl.create)

usersRouter.post('/login', usersCtrl.authenticate)

// putting middlewear here will affect all routes below
usersRouter.use(verifyToken)

usersRouter.route('/:id')
	.get(usersCtrl.show)
	.patch(usersCtrl.update)
	.delete(usersCtrl.destroy)

module.exports = usersRouter