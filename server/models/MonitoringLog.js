import mongoose from "mongoose";

const monitoringLogSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "ALERT",
        "SERVER_EVENT",
        "THRESHOLD_VIOLATION",
      ],
    },

    severity: {
      type: String,
      required: true,
      enum: ["INFO", "WARNING", "CRITICAL"],
      default: "INFO",
    },

    resource: {
      type: String,
      enum: ["CPU", "MEMORY", "DISK", "NETWORK", "SERVER"],
      default: "SERVER",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: Number,
      default: null,
    },

    threshold: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const MonitoringLog = mongoose.model(
  "MonitoringLog",
  monitoringLogSchema
);

export default MonitoringLog;