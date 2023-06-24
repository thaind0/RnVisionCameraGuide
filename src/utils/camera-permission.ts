import {Alert, Linking} from 'react-native';
import {Camera} from 'react-native-vision-camera';

export const requestCameraPermission = async () => {
  const cameraPermission = await Camera.requestCameraPermission();
  /**
   *  If the camera permission is still not granted, show an alert to
   * inform the user to go to settings and allow camera permission manually
   */
  if (cameraPermission !== 'authorized') {
    Alert.alert(
      'You need to allow camera permission.',
      'Please go to Settings and allow camera permission',
      [
        {
          text: 'Open Settings',
          // On pressing the button, we will open the settings
          onPress: Linking.openSettings,
        },
      ],
    );
  }

  return cameraPermission;
};
