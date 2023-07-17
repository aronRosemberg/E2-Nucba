"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
//post get y get ld
router.post("/", usuarios_1.createUsuario);
router.get("/:dni", usuarios_1.getUsuarioByDNI);
router.put("/:dni", usuarios_1.updateUsuario);
exports.default = router;
