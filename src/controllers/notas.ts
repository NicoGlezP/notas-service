import { Request, Response } from "express";
import { db } from "../config/db";
import { generatePDF } from "../services/pdf.service";
import { uploadPDF } from "../services/s3.service";
import { Readable } from "stream";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws";
import { v4 as uuid } from "uuid";
import { marcarNotaDescargada } from "../services/s3.service";
import { sendToQueue } from "../services/queue.service";

export const createNota = async (req: Request, res: Response) => {

 throw new Error("Error de prueba");

};

export const downloadNota = async (req: Request, res: Response) => {
  const { rfc, folio } = req.params;

  const key = `${rfc}/${folio}.pdf`;

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
  });

  const response = await s3.send(command);

  const stream = response.Body as Readable;

  await marcarNotaDescargada(key);

  res.setHeader("Content-Type", "application/pdf");

  stream.pipe(res);
};

export const launchError = async (req: Request, res: Response) => {

  throw new Error("Error de prueba");
};
