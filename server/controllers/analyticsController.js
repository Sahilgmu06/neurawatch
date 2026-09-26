import getAnalytics from "../services/analyticsService.js";

export const getAnalyticsData = async (req, res) => {
  try {
    const { range = "daily" } = req.query;

    const allowedRanges = [
      "daily",
      "weekly",
      "monthly",
    ];

    if (!allowedRanges.includes(range)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid range. Use daily, weekly, or monthly",
      });
    }

    const analytics = await getAnalytics(range);

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve analytics",
    });
  }
};