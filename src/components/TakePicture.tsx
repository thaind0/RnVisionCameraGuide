import React, {useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import CameraWarper from './CameraWarper';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import CaptureButton from './CaptureButton';

interface TakePictureProps {
  isActive: boolean;
  onInactive?: () => void;
}

const TakePicture = (props: TakePictureProps) => {
  const {isActive, onInactive} = props;
  const devices = useCameraDevices();
  const camera = useRef<Camera>(null);

  const device = devices.back;

  const onPhotoCaptured = useCallback((file: PhotoFile) => {
    console.log(file);
  }, []);

  return (
    <CameraWarper isActive={isActive} loading={!device} onInactive={onInactive}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device!}
        isActive={isActive}
        photo
      />
      <CaptureButton
        camera={camera}
        style={styles.captureButton}
        onMediaCaptured={onPhotoCaptured}
      />
    </CameraWarper>
  );
};

export default TakePicture;

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
