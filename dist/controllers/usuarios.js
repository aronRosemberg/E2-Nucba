"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsuario = exports.getUsuarioByDNI = exports.createUsuario = void 0;
//IStudent es una interfaz y Student es un modelo de BD
const usuario_1 = __importDefault(require("../models/usuario"));
//import Camada from "../models/camada"//Camada es un modelo de BD
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioData = req.body; //estos valores se los tengo q dar desde base de datos
    const { dni, nombre, gastos, email } = usuarioData;
    if (!dni || !nombre || !email) {
        res.json({
            msj: "Faltan datos necesarios en la peticion"
        });
        return;
    }
    const alumnEnDB = yield usuario_1.default.findOne({ dni: dni });
    if (alumnEnDB) {
        res.json({
            msj: "El alumno ya está registrado"
        });
    }
    //si existe tira una alerta , sino lo agrega
    const user = new usuario_1.default({
        dni,
        nombre,
        gastos,
        email,
    });
    yield user.save();
    res.json({
        msj: "Todo ok",
        user
    });
});
exports.createUsuario = createUsuario;
const getUsuarioByDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params; // se obtiene de la URL
    const user = yield usuario_1.default.findOne({ dni: dni }); //busca el primero q cumpla la condicion
    res.json({
        user
    });
});
exports.getUsuarioByDNI = getUsuarioByDNI;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params; // se obtiene de la URL
    const usuarioData = yield usuario_1.default.findOne({ dni: dni }); //obtener de la BD
    if (!usuarioData) {
        res.json({
            msj: "El usuario no se encontró en la base de datos"
        });
        return;
    }
    const { gastos } = req.body; // se obtiene de la base de datos , data obtiene todo lo q no es estado y camada
    usuarioData.gastos = usuarioData.gastos + gastos;
    const user = yield usuario_1.default.findOneAndUpdate({ dni: dni }, usuarioData, { new: true });
    res.json({
        user
    });
});
exports.updateUsuario = updateUsuario;
