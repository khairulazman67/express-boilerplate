import {Router} from 'express'
import {getProducts, getProduct, storeProduct, deleteProduct, putProduct, patchProduct} from '../controllers'

const router = Router()

router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', storeProduct);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', putProduct);
router.patch('/product/:id', patchProduct);

export default router