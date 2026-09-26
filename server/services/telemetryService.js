import getSystemMetrics from "./systemMetrics.js";
import Telemetry from "../models/Telemetry.js";

const collectAndStoreTelemetry = async () => {
  const metrics = await getSystemMetrics();

  const telemetry = await Telemetry.create(metrics);

  return telemetry;
};

export default collectAndStoreTelemetry;