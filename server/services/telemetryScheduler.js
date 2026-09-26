import getSystemMetrics from "./systemMetrics.js";
import Telemetry from "../models/Telemetry.js";
import evaluateAlerts from "./alertService.js";

const collectAndStoreTelemetry = async () => {
  const metrics = await getSystemMetrics();

  const telemetry = await Telemetry.create(metrics);

  await evaluateAlerts(metrics);

  return telemetry;
};

export default collectAndStoreTelemetry;