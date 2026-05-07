import { Router } from "express";
import { createNota, downloadNota } from "../controllers/notas";

const router = Router();

router.post("/", createNota);

router.get("/:rfc/:folio/download", downloadNota);

export default router;
