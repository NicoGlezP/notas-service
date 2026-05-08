import { Router } from "express";
import { createNota, downloadNota, launchError } from "../controllers/notas";

const router = Router();

router.post("/", createNota);

router.get("/:rfc/:folio/download", downloadNota);

router.get("/error", launchError);

export default router;
