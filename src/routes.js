import { Router } from 'express'

import UserController from './controller/UserController'
import PostController from './controller/PostController'

const router = Router()

router.post('/user', UserController.createUser)
router.get('/users', UserController.findAllUsers)
router.get('/user/:id', UserController.findUser)
router.put('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)

router.post('/post/user/:id', PostController.createPost)
router.get('/posts', PostController.FindAllPosts)
router.put('/post/:id', PostController.UpdatePost)
router.delete('/post/:id', PostController.DeletePost)



export { router }
