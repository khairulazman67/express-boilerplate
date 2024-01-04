import { NextFunction, Request, Response } from 'express'
import { prisma } from '../db'
import { 
    getAllProducts,
    saveProduct,
    destroyProduct,
    updateProduct
} from '../repository';
import { productInsertSchema } from '../utils/validations';
import { invalidPayloadResp } from '../utils/response';


export const getProducts = async(req: Request, res:Response, next:NextFunction)=>{
    try{
        const products = await getAllProducts();
        res.send(products)
    }catch (error) {
        next(error);
    }
}

export const getProduct = async(req: Request, res:Response, next:NextFunction)=>{
    try{
        const products = await prisma.product.findUnique({
            where:{id: req.params.id}
        });

        if(!products){
            return res.status(400).send('Product not fount')
        }
        res.send(products)
    }catch (error) {
        next(error);
    }
}

export const storeProduct = async(req: Request, res:Response, next:NextFunction)=>{
    try{
        const validationResult = productInsertSchema.safeParse({
            ...req.body
        });

        if (!validationResult.success) {
            return invalidPayloadResp(res, validationResult.error);
        }

        const product = await saveProduct(validationResult.data);
        res.send(product)
    }catch (error) {
        next(error);
    }
}

export const deleteProduct = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const productId = req.params.id
        const deleteProduct = await destroyProduct(productId)
        res.send(deleteProduct)

    }catch(error){
        next(error)
    }
}

export const putProduct =async (req:Request, res:Response, next:NextFunction)=>{
     try{
        const productId = req.params.id
        const productData = req.body

        const products = await updateProduct(productId,productData)
        res.send(products)
    }catch(error){
        next(error)
    }
}


export const patchProduct =async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const productId = req.params.id
        const productData = req.body

        const products = await updateProduct(productId,productData)
        res.send(products)
    }catch(error){
        next(error)
    }
}