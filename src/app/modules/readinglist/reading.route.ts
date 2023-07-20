import express from 'express'

import { ReadingController } from './reading.controller'
const router = express.Router()

router.post('/', ReadingController.createReading)
router.delete('/:id', ReadingController.deleteReading)
router.get('/', ReadingController.getAllReading)
router.patch('/:id', ReadingController.patchReading)

export const ReadingRoute = router
