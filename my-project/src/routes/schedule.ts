import { Router } from "express";
import { weeklyReportScheduler } from "../schedule/WeekSchedule";
const router = Router();

router.post("/start-scheduler", async (req, res) => {
  await weeklyReportScheduler.start();
  return res.json({ message: "OK" });
});

router.post("/stop-scheduler", async (req, res) => {
  await weeklyReportScheduler.stop();
  return res.json({ message: "OK" });
});

export default router;
