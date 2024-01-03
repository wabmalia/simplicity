import clock from "clock";
import * as document from "document";
import * as messaging from "messaging";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { today } from "user-activity";
import { display } from "display";
import sleep from "sleep";
import { preferences } from "user-settings";

const Tap = (element, callback) => {
  let timer;
  let count = 0;
  element.onclick = () => {
    count++;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(count);
      count = 0;
    }, 350);
  };
};

/**
 * Settings
 */
const ASLEEP_BRIGHTNESS_KEY = "asleepBrightness";
const FLASHLIGHT_COLOR_KEY = "flashlightColor";
const settings = {
  brightness: 0.7,
  color: "white",
};
messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt && evt.data) {
    switch (evt.data.key) {
      case ASLEEP_BRIGHTNESS_KEY:
        settings.brightness = 1.0 - Number(evt.data.value) / 100;
        break;
      case FLASHLIGHT_COLOR_KEY:
        settings.color = evt.data.value;
        break;
    }
  }
});

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

const monoDigits = (number) => {
  const text = number.toString();
  const [tens, unit] = text;
  const mono = (n) => {
    return String.fromCharCode(0x10 + Number(n));
  };
  return `${mono(tens)}${mono(unit)}`;
};
const formatTime = (i) => monoDigits(i < 10 ? (i = "0" + i) : i);

clock.granularity = "minutes";

const time = document.getElementById("clock");
const date = document.getElementById("date");
const amPm = document.getElementById("am-pm");

clock.ontick = (evt) => {
  const is24h = preferences.clockDisplay === "24h";
  const today = evt.date;
  const hours = formatTime(is24h ? today.getHours() : today.getHours() % 12);
  const mins = formatTime(today.getMinutes());
  time.text = `${hours} ${mins}`;

  date.text = getDay(today);
  const isAfternoon = today.getHours() / 12 >= 1;
  amPm.style.display = is24h ? "none" : "";
  amPm.text = isAfternoon ? "PM" : "AM";
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
 * Flashlight
 */
const dim = document.getElementById("dim");
Tap(dim, (count) => {
  if (count === 3) {
    if (dim.class === "flashlight") {
      dim.class = "dim";
      dim.style.fill = "black";
    } else {
      dim.class = "flashlight";
      dim.style.fill = settings.color;
    }
  }
});

/**
 * Manage features
 */
const bodyPresence = new BodyPresenceSensor();
display.onchange = () => {
  updateSteps(display.on);

  dim.class = "dim";
  if (display.on) {
    hrm.start();
    dim.style.opacity = sleep.state === "asleep" ? settings.brightness : 0;
  } else {
    hrm.stop();
  }
};
bodyPresence.onreading = () => {
  changeHeartRateVisibility(bodyPresence.present);
  updateSteps(bodyPresence.present);
  if (!bodyPresence.present) {
    hrm.stop();
  } else {
    hrm.start();
  }
};
bodyPresence.start();
