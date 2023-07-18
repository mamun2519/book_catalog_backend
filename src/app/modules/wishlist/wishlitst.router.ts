import express from 'express'
import { WishListController } from './wishlist.controller'
const router = express.Router()

router.delete('/:id', WishListController.deleteWishlist)
router.post('/', WishListController.createWishlist)
router.get('/', WishListController.getAllWishlist)

export const WishListRoute = router
