#adb reverse tcp:8081 tcp:8081
npx react-native run-android --verbose

# error: couldn't find DSO to load: libfbjni.so
# https://stackoverflow.com/a/63131031
