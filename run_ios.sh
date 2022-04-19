# npx react-native run-ios

target_device="iPhone"

if [ "$1" ]
then
  target_device=$1
fi

echo "installing app to device: $target_device"

npx react-native run-ios --device "$target_device" --configuration Release
