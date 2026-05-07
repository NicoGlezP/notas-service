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

 const { cliente_id, direccion_facturacion, direccion_envio, items } = req.body;

 const folio = uuid();

 let total = 0;

 for (const item of items) {
  total += item.cantidad * item.precio_unitario;
 }

 // Guardar nota
 const [notaResult]: any = await db.execute(
  `INSERT INTO notas (folio,cliente_id,direccion_facturacion,direccion_envio,total)
   VALUES (?,?,?,?,?)`,
  [folio, cliente_id, direccion_facturacion, direccion_envio, total]
 );

 const notaId = notaResult.insertId;

 // Guardar items
 for (const item of items) {
  await db.execute(
   `INSERT INTO nota_items
    (nota_id,producto_id,cantidad,precio_unitario,importe)
    VALUES (?,?,?,?,?)`,
   [
    notaId,
    item.producto_id,
    item.cantidad,
    item.precio_unitario,
    item.cantidad * item.precio_unitario
   ]
  );
 }

 // Obtener cliente
 const [clienteRows]: any = await db.execute(
  `SELECT * FROM clientes WHERE id = ?`,
  [cliente_id]
 );

 const cliente = clienteRows[0];

 // Generar PDF
 const pdfPath = `./nota-${folio}.pdf`;

 await generatePDF({ folio, cliente, items, total }, pdfPath);

 // Subir a S3
 const bucket = process.env.BUCKET_NAME!;
 const key = `${cliente.rfc}/${folio}.pdf`;

 await uploadPDF(bucket, key, pdfPath);

 // Link descarga
 const downloadLink = `http://IP:8001/notas/${cliente.rfc}/${folio}/download`;

 // Enviar mensaje a cola
await sendToQueue({
  correo: cliente.correo,
  folio,
  downloadLink
});

 res.json({
  message: "Nota creada",
  folio
 });

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
