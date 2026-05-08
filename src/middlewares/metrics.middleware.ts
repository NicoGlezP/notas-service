import { Request, Response, NextFunction } from "express";

import { sendMetric } from "../services/metrics.service";

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const start = Date.now();

  res.on("finish", async () => {

    const duration = Date.now() - start;

    const env =
      process.env.NODE_ENV || "local";

    // Tiempo endpoint
    await sendMetric(
      "RequestDuration",
      duration,
      "Milliseconds",
      env
    );

    // HTTP status
    let metric = "";

    if (res.statusCode >= 200 && res.statusCode < 300) {
      metric = "HTTP2xx";
    }
    else if (res.statusCode >= 400 && res.statusCode < 500) {
      metric = "HTTP4xx";
    }
    else if (res.statusCode >= 500) {
      metric = "HTTP5xx";
    }

    if (metric) {

      await sendMetric(
        metric,
        1,
        "Count",
        env
      );
    }
  });

  next();
};
