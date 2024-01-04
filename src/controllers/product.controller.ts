import {NextFunction, Request, Response} from 'express'
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import { stringify } from 'querystring';

const prisma = new PrismaClient()

export const getProducts = async(req: Request, res:Response, next:NextFunction)=>{
    try{
        
        const products = await prisma.product.findMany();
        res.send(products)
    }catch (error) {
        next(error);
    }
}

export const storeProduct = async(req: Request, res:Response, next:NextFunction)=>{
    try{
        const newProductData = await req.body

        const product = await prisma.product.create({
            data: {
                name        :   newProductData.name,
                description :   newProductData.description,
                image       :   newProductData.image,
                price       :   newProductData.price
            },
        });

        res.send({
            message : "Create product success",
            data : product
        })
    }catch (error) {
        next(error);
    }
}

export const deleteProduct = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const productId = req.params.productId

        const deleteProduct = await prisma.product.delete({
            where:{
                id : productId
            }
        })

        res.send({
            message : "berhasil melakukan penghapusan data",
            data : deleteProduct
        })
    }catch(error){
        next(error)
    }
}