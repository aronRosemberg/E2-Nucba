import express, {Express} from "express"//sirve para manejar rutas

import studentRoutes from "../routes/usuario"//exportado con defauld
//import camadasRoutes from "../routes/camadas"//exportado con defauld
// se exporto sin default
import { conectarDB } from "../database/config"//aca se conoecta a la base de datos dinamoDB

export class Server {
    app: Express

    constructor(){
        this.app = express()
        this.conexionaDB();//me conecto a la base de datos
        this.middlewares();//Analiza los pedidos entrantes con cargas JSON
        this.routes();//para usar las rutas students y camadas
    }

    async conexionaDB():Promise<void>{
        await conectarDB()
    }

    middlewares(): void {
        this.app.use(express.json())//Analiza los pedidos entrantes con cargas JSON
    }

    routes(): void{
        this.app.use("/usuarios", studentRoutes)
        
    }

    listen(): void{
        this.app.listen(8080, ()=>{
            console.log("Corriendo en el puerto 8080")
        })
    }
}