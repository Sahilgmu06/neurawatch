import mongoose from "mongoose";

const telemetrySchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

    cpu: {
      usage: {
        type: Number,
        required: true,
      },
      cores: {
        type: Number,
        required: true,
      },
    },

    memory: {
      usage: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      used: {
        type: Number,
        required: true,
      },
      available: {
        type: Number,
        required: true,
      },
    },

    disk: {
      usage: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      used: {
        type: Number,
        required: true,
      },
      available: {
        type: Number,
        required: true,
      },
    },

    network: {
      interface: {
        type: String,
        default: "unknown",
      },
      rxBytes: {
        type: Number,
        default: 0,
      },
      txBytes: {
        type: Number,
        default: 0,
      },
    },

    uptime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Telemetry = mongoose.model("Telemetry", telemetrySchema);

export default Telemetry;