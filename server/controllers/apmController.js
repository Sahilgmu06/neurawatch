import getApmMetrics from "../services/apmService.js";

export const getApmStatus = async (req, res) => {
  try {
    const apm = await getApmMetrics();

    return res.status(200).json({
      success: true,
      data: apm,
    });
  } catch (error) {
    console.error("APM controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve APM metrics",
    });
  }
};