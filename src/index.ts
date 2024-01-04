import express, {Application, Request, Response} from "express"
import dotenv from "dotenv"

import {
    apiRoutes
} from './routers';

dotenv.config()

const PORT = process.env.PORT;

class App{
    public app: Application;
    

    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.routes();
    }

    protected routes():void{
        this.app.use('/v1/', apiRoutes);
    }
}

const app = new App().app;

app.listen(PORT,()=>{
    console.log("Express API running in port : ", PORT)
});
