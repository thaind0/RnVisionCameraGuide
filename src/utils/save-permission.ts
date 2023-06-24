import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

export const requestSavePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  if (permission == null) {
    return false;
  }
  let hasPermission = await PermissionsAndroid.check(permission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(
      permission,
    );
    hasPermission = permissionRequestResult === 'granted';
  }
  if (!hasPermission) {
    Alert.alert(
      'You need to allow storage permission.',
      'Please go to Settings and allow storage permission',
      [
        {
          text: 'Open Settings',
          // On pressing the button, we will open the settings
          onPress: Linking.openSettings,
        },
      ],
    );
  }

  return hasPermission;
};
