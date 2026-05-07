import fs from "fs";
import { PutObjectCommand, CopyObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/aws";

export const uploadPDF = async (
 bucket: string,
 key: string,
 filePath: string
) => {

 const fileContent = fs.readFileSync(filePath);

 const command = new PutObjectCommand({
  Bucket: bucket,
  Key: key,
  Body: fileContent,
  ContentType: "application/pdf",
  Metadata: {
   "hora-envio": new Date().toISOString(),
   "nota-descargada": "false",
   "veces-enviado": "1"
  }
 });

 await s3.send(command);
};

export const marcarNotaDescargada = async (key: string) => {

 const head = await s3.send(
  new HeadObjectCommand({
   Bucket: process.env.BUCKET_NAME!,
   Key: key
  })
 );

 const metadata = head.Metadata || {};

 await s3.send(
  new CopyObjectCommand({
   Bucket: process.env.BUCKET_NAME!,
   CopySource: `${process.env.BUCKET_NAME}/${key}`,
   Key: key,
   Metadata: {
    ...metadata,
    "nota-descargada": "true"
   },
   MetadataDirective: "REPLACE"
  })
 );
};
