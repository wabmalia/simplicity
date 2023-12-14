# Fitbit facewatch

A custom Fitbit facewatch that allowed me to understand what my device provides and also create something more to my taste.

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
