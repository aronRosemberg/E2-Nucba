import {Request, Response} from "express"


//IStudent es una interfaz y Student es un modelo de BD
import Usuario, {ISusuario} from "../models/usuario" 
//import Camada from "../models/camada"//Camada es un modelo de BD

export const createUsuario =async (req:Request, res: Response) => {

    const usuarioData:ISusuario = req.body//estos valores se los tengo q dar desde base de datos

    const {dni, nombre,gastos,email} = usuarioData

    if(!dni || !nombre || !email){
        res.json({
            msj: "Faltan datos necesarios en la peticion"
        })
        return
    }
   
    const alumnEnDB = await Usuario.findOne({dni:dni})

    if(alumnEnDB){
        res.json({
            msj: "El alumno ya está registrado"
        })
    }
    //si existe tira una alerta , sino lo agrega
    const user = new Usuario({
        dni,
        nombre,
        gastos,
        email,
        
    })

    await user.save()
    
    res.json({
        msj:"Todo ok",
        user
    })
}



export const getUsuarioByDNI =async (req:Request, res:Response) => {
    const { dni } = req.params// se obtiene de la URL

    const user = await Usuario.findOne({dni:dni})//busca el primero q cumpla la condicion
    

    res.json({
        user
    })
}


export const updateUsuario = async (req: Request, res: Response) => {
    const { dni } = req.params;// se obtiene de la URL
    const usuarioData = await Usuario.findOne({dni:dni});//obtener de la BD
    if(!usuarioData){
        res.json({
            msj: "El usuario no se encontró en la base de datos"
        })
        return
    }
    const {gastos} = req.body; // se obtiene de la base de datos , data obtiene todo lo q no es estado y camada

    usuarioData.gastos = usuarioData.gastos + gastos;
    
    const user = await Usuario.findOneAndUpdate({dni: dni}, usuarioData,{new:true} );

    res.json({
        user
    })
};
