import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = (nota: any, path: string) => {
 return new Promise((resolve) => {

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(path);

  doc.pipe(stream);

  doc.fontSize(20).text("Nota de Venta");

  doc.text(`Folio: ${nota.folio}`);

  doc.text(`Cliente: ${nota.cliente.razon_social}`);
  doc.text(`RFC: ${nota.cliente.rfc}`);

  doc.moveDown();

  nota.items.forEach((item: any) => {
   doc.text(
    `${item.cantidad} - ${item.producto_id} - ${item.cantidad} - ${item.precio_unitario}`
   );
  });

  doc.end();

  stream.on("finish", resolve);
 });
};
