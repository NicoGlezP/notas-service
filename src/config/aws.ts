import { S3Client } from "@aws-sdk/client-s3";
import { SQSClient } from "@aws-sdk/client-sqs";
import { CloudWatchClient } from "@aws-sdk/client-cloudwatch";

export const s3 = new S3Client({
 region: process.env.AWS_REGION,
});

export const sqs = new SQSClient({
  region: process.env.AWS_REGION,
});

export const cloudwatch = new CloudWatchClient({
  region: process.env.AWS_REGION,
});
