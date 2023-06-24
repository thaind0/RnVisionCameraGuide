import React, {RefObject, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import {Camera, PhotoFile} from 'react-native-vision-camera';
import {CAPTURE_BUTTON_SIZE} from './contains';

interface CaptureButtonProps extends ViewProps {
  camera: RefObject<Camera>;
  onMediaCaptured: (file: PhotoFile) => void;
}

const CaptureButton = (props: CaptureButtonProps) => {
  const {camera, onMediaCaptured, style, ...rest} = props;

  const onPress = useCallback(async () => {
    const photo = await camera.current?.takePhoto();
    onMediaCaptured(photo!);
  }, [camera, onMediaCaptured]);

  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[styles.captureButton, style]}>
      <View style={styles.captureButtonInner} />
    </TouchableOpacity>
  );
};

export default CaptureButton;

const styles = StyleSheet.create({
  captureButton: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    padding: 4,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: 'white',
  },
  captureButtonInner: {
    flex: 1,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: 'white',
  },
});
