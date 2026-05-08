import express from "express";
import cors from "cors";

import notasRoutes from "./routes/notas";
import { metricsMiddleware } from "./middlewares/metrics.middleware";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(metricsMiddleware);

app.use("/notas", notasRoutes);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`API corriendo en puerto ${PORT}`);
});
