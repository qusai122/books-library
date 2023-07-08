import cron, { ScheduleOptions } from "node-cron";

const scheduleOptions: ScheduleOptions = {
  scheduled: false,
  timezone: "Asia/Jerusalem",
  name: "simple-task",
  recoverMissedExecutions: true,
};

const scheduleAction = async () => {
  const currentDate = new Date();
  console.log(
    `This task is weekly running- ${currentDate.getHours()}:${currentDate.getMinutes()}`
  );
};

const weeklyReportScheduler = cron.schedule(
  "11 13 * * SAT", // to schedule at 7:30 on monday
  scheduleAction,
  scheduleOptions
);

export { weeklyReportScheduler };
