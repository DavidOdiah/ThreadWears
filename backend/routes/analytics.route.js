import express from "express"

import { getDailySalesData, getAnalyticsData } from "../controllers/analytics.controller.js"; 
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date()
        const startDate = new Date(endDate.getTime() - 6 * 24 * 60 * 60 * 1000); // Going to be a 7 days period

        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.json({
            analyticsData,
            dailySalesData
        })

    } catch (error) {
        console.log("Error in analytics route", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;