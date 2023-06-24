import React, {useCallback, useRef} from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import CameraWarper from './CameraWarper';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import CaptureButton from './CaptureButton';
import MediaPreview from './MediaPreview';
import {CONTENT_PADDING} from './contains';

interface TakePictureProps {
  isActive: boolean;
  onInactive?: () => void;
}

const TakePicture = (props: TakePictureProps) => {
  const {isActive, onInactive} = props;
  const devices = useCameraDevices();
  const camera = useRef<Camera>(null);
  const device = devices.back;

  const [mediaPath, setMediaPath] = React.useState<string>();

  const handleFocus = useCallback(
    async ({nativeEvent}: GestureResponderEvent) => {
      await camera?.current?.focus({
        x: Math.round(nativeEvent.pageX),
        y: Math.round(nativeEvent.pageX),
      });
    },
    [],
  );

  const onPhotoCaptured = useCallback(
    (file: PhotoFile) => setMediaPath(file.path),
    [],
  );

  return (
    <CameraWarper isActive={isActive} loading={!device} onInactive={onInactive}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device!}
        isActive={isActive}
        onTouchStart={handleFocus}
        enableZoomGesture
        photo
      />
      <CaptureButton
        camera={camera}
        style={styles.captureButton}
        onMediaCaptured={onPhotoCaptured}
      />

      <MediaPreview
        mediaPath={mediaPath}
        onInactive={() => setMediaPath(undefined)}
      />
    </CameraWarper>
  );
};

export default TakePicture;

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    bottom: CONTENT_PADDING,
    alignSelf: 'center',
  },
});
