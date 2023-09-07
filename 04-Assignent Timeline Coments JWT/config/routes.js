const express = require('express');
const route = express.Router();
const postController = require('../controller/postController')
const commentController = require('../controller/commentController')
const userController = require('../controller/userController')
const auth = require('../middleware/auth')


route.get('/', auth.userAuth, postController.homePage);
route.get('/create-new-post',auth.userAuth, postController.createNewPost);
route.post('/create-post/:id',auth.userAuth, postController.submitPost)
route.post('/add-comment/:id', commentController.addComment)

route.get('/login', auth.loginAuth ,userController.loginPage)

route.get('/logOut-user', userController.LogOut)

route.post('/signup-user', userController.createUser)
route.post('/login-user', userController.loginUser)


module.exports = route;