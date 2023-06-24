import {Alert, Linking} from 'react-native';
import {Camera} from 'react-native-vision-camera';

export const requestMicrophonePermission = async () => {
  const microphonePermission = await Camera.requestMicrophonePermission();
  /**
   *  If the microphone permission is still not granted, show an alert to
   * inform the user to go to settings and allow microphone permission manually
   */
  if (microphonePermission !== 'authorized') {
    Alert.alert(
      'You need to allow microphone permission.',
      'Please go to Settings and allow microphone permission',
      [
        {
          text: 'Open Settings',
          // On pressing the button, we will open the settings
          onPress: Linking.openSettings,
        },
      ],
    );
  }

  return microphonePermission;
};
