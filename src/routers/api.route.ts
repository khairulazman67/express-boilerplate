import {Router} from 'express'
import {getProducts, storeProduct} from '../controllers'

const router = Router()

router.get('/products', getProducts);
router.post('/product', storeProduct);

export default router