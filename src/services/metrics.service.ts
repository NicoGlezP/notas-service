import { PutMetricDataCommand, StandardUnit } from "@aws-sdk/client-cloudwatch";

import { cloudwatch } from "../config/aws";

const NAMESPACE = "NotasService";

/// Envía una métrica personalizada a CloudWatch
export const sendMetric = async (
  metricName: string,
  value: number,
  unit: StandardUnit,
  environment: string
) => {

  const command = new PutMetricDataCommand({
    Namespace: NAMESPACE,

    MetricData: [
      {
        MetricName: metricName,

        Dimensions: [
          {
            Name: "Environment",
            Value: environment,
          },
        ],

        Unit: unit,
        Value: value,
      },
    ],
  });

  await cloudwatch.send(command);
  console.log("Métrica enviada");
};
