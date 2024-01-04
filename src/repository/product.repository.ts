import { prisma } from "../db";
import { ProductPayload } from "../utils/validations";

export const getAllProducts = async()=>{
    return await prisma.product.findMany();
}

export const saveProduct = async(data:ProductPayload)=>{
    const newProductData =  data

    const product = await prisma.product.create({
        data: {
            name        :   newProductData.name,
            description :   newProductData.description,
            image       :   newProductData.image,
            price       :   newProductData.price
        },
    });

    if(!product){
        return {
            message : "an error occurred in the system"
        } 
    }

    return {
        message : "Create product success",
        data : product
    }
}

export const destroyProduct = async(productId:string)=>{
    await prisma.product.delete({
        where:{
            id : productId
        }
    })

    return {
        message : "berhasil melakukan penghapusan data"
    }
}

export const updateProduct = async(productId:string, productData:any)=>{
    const products = await prisma.product.update({
        where:{
            id : productId
        },
        data: {
            name        :   productData.name,
            description :   productData.description,
            image       :   productData.image,
            price       :   productData.price
        },
    })
    
    return {
        message : "Edit product success",
        data : products
    }
}