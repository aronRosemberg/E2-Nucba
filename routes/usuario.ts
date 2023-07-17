import { Router } from "express"

import { createUsuario, getUsuarioByDNI, updateUsuario } from "../controllers/usuarios" 

const router = Router()
//post get y get ld
router.post("/", createUsuario)

router.get("/:dni", getUsuarioByDNI)

router.put("/:dni", updateUsuario)

export default router