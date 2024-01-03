# Fitbit facewatch

A custom Fitbit facewatch that allowed me to understand what my device provides and also create something more to my taste.

# Features

This watch targets simplicity, however there are some hidden things that make it very functional.

- Support for 12/24h display option;
- Flashlight - `Triple-tap` to activate a flashlight, it is something that I regularly need when searching something in a low-light environment;
- Asleep brightness - When the watch detects you as being asleep, when I try to see the time at 3am I often get "flashed". With this facewatch, it dims the brightness in order to make it less painful to glimpse time.

# Requirements

- Node
- [Fitbit OS Simulator](https://dev.fitbit.com/release-notes/fitbit-os-simulator/)

# How to start

- Launch Fitbit OS Simulator
- rum `npm run debug`
- execute `bi` (build and install)

If you want to deploy it directly to your watch, follow the steps:

- Open Fitbit app on your cellphone:
  - Go to your watch configuration page
  - Tap `Developer Menu`
  - Activate `Developer Bridge` and keep screen on (the last one just makes it more reliable for the link not to be broken)
- On your watch:
  - Go to settings menu
  - Scroll to `Developer Bridge`
  - Activate it
- When inside the command line tools for fitbit (where you execute `bi`), execute `connect device` to check if the device is detected

# Documentation

## [Monospacing](https://dev.fitbit.com/build/guides/user-interface/css/#monospace-numbers)

### I do this for free, but if you want to donate anything... [Thank you!](https://www.paypal.com/donate/?business=464DTVYBGS6M8&no_recurring=1&item_name=Thank+you+so+much%2C+this+makes+me+want+to+continue+doing+what+I%27m+doing+and+more%21%21%21&currency_code=EUR)
