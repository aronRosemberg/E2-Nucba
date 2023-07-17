"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    gastos: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});
//el primer parametro es el nombre de la coleccion en la base de datos
const Usuario = (0, mongoose_1.model)("UsuarioBD", UsuarioSchema);
exports.default = Usuario;
