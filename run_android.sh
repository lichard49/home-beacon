#adb reverse tcp:8081 tcp:8081
npx react-native run-android --verbose --variant=release

# error: More than one file was found with OS independent path 'lib/armeabi-v7a/libfbjni.so'.
# https://stackoverflow.com/questions/74327301/more-than-one-file-was-found-with-os-independent-path-lib-armeabi-v7a-libfbjni

# error: couldn't find DSO to load: libfbjni.so
# https://stackoverflow.com/a/63131031
