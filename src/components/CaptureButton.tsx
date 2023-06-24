import React, {RefObject, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import {Camera, PhotoFile} from 'react-native-vision-camera';

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
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 4,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: 'white',
  },
  captureButtonInner: {
    flex: 1,
    borderRadius: 40,
    backgroundColor: 'white',
  },
});
