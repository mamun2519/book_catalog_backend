import express from 'express'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post('/singUp', AuthController.singUpUser)
router.post('/singIn', AuthController.singInUser)
router.patch('/reset-password', () => {})
router.patch('/forget-password', () => {})

export const AuthRoute = router
