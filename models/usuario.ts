import {Model,ObjectId, Schema, model} from "mongoose"

export interface ISusuario {
    dni: number;
    nombre: string;
    gastos:number;
    //camada: ObjectId;
    email: string;
    //estado: boolean;
}

const UsuarioSchema = new Schema<ISusuario>({
    dni:{
        type: Number,
        required: true,
        unique:true
    },
    nombre: {
        type:String,
        required: true,
    },
    gastos:{
        type:Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

})

//el primer parametro es el nombre de la coleccion en la base de datos
const Usuario: Model<ISusuario> = model<ISusuario>("UsuarioBD", UsuarioSchema)
export default Usuario