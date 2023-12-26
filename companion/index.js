import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me as companion } from "companion";

const ASLEEP_BRIGHTNESS_KEY = "asleepBrightness";
const FLASHLIGHT_COLOR_KEY = "flashlightColor";

// Settings have been changed
settingsStorage.addEventListener("change", (evt) => {
  sendValue(evt.key, evt.newValue);
});

// Settings were changed while the companion was not running
if (companion.launchReasons.settingsChanged) {
  // Send the value of the setting
  sendValue(
    ASLEEP_BRIGHTNESS_KEY,
    settingsStorage.getItem(ASLEEP_BRIGHTNESS_KEY)
  );
  sendValue(
    FLASHLIGHT_COLOR_KEY,
    settingsStorage.getItem(FLASHLIGHT_COLOR_KEY)
  );
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val),
    });
  }
}
function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}
