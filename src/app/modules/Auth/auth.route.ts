import express from 'express'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post('/singUp', AuthController.singUpUser)
router.post('/singIn', AuthController.singInUser)
router.patch('/reset-password', AuthController.resetPassword)
router.patch('/forget-password', AuthController.forgetPassword)

export const AuthRoute = router
