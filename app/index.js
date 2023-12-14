import clock from "clock";
import * as document from "document";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { today, goals } from "user-activity";
import { display } from "display";
import sleep from "sleep";

/**
 * Time
 */
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDay = (date) =>
  `${month[date.getMonth()]} ${date.getDate()}, ${weekdays[date.getDay()]}`;

const zeroPad = (i) => (i < 10 ? (i = "0" + i) : i);

clock.granularity = "minutes";

const time = document.getElementById("clock");
const date = document.getElementById("date");

clock.ontick = (evt) => {
  const today = evt.date;
  const hours = zeroPad(today.getHours());
  const mins = zeroPad(today.getMinutes());
  time.text = `${hours}:${mins}`;

  date.text = getDay(today);
};

/**
 * Heartbeat
 */
const heartRateContainer = document.getElementById("#heart-rate-container");
const heartRate = document.getElementById("heart-rate");
const changeHeartRateVisibility = (enable) => {
  heartRateContainer.style.display = !enable ? "none" : "";
};

const hrm = new HeartRateSensor();
hrm.onreading = () => {
  heartRate.text = hrm.heartRate;
};

hrm.start();

/**
 * Activity
 */
const steps = document.getElementById("steps");
const updateSteps = (() => {
  let timer;
  return (enable) => {
    clearInterval(timer);
    if (enable) {
      timer = setInterval(() => {
        steps.text = today.adjusted.steps;
      }, 1000);
    }
  };
})();

/**
 * Sleep
 */



/**
 * Manage features
 */
const dim = document.getElementById("dim");
const bodyPresence = new BodyPresenceSensor();
display.onchange = () => {
  updateSteps(display.on);

  // Dim screen while asleep
  if (display.on) dim.style.opacity = sleep.state === "asleep" ? 0.5 : 0;
};
bodyPresence.onreading = () => {
  console.log(bodyPresence.present);
  changeHeartRateVisibility(bodyPresence.present);
  updateSteps(bodyPresence.present);
};
bodyPresence.start();
