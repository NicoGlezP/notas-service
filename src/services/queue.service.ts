import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqs } from "../config/aws";

export const sendToQueue = async (body: any) => {
  
  const command = new SendMessageCommand({
    QueueUrl: process.env.SQS_QUEUE_URL!,
    MessageBody: JSON.stringify(body),
  });

  await sqs.send(command);
};
