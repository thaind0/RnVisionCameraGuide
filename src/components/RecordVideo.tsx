import React, {useCallback, useRef} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import {
  Camera,
  PhotoFile,
  VideoFile,
  useCameraDevices,
} from 'react-native-vision-camera';
import CameraWarper from './CameraWarper';
import CaptureButton from './CaptureButton';
import MediaPreview from './MediaPreview';
import CloseButton from './common/CloseButton';
import {CONTENT_PADDING} from './contains';

interface RecordVideoProps {
  isActive: boolean;
  onInactive?: () => void;
}

type MediaType = {
  path: string;
  type: 'photo' | 'video';
};

const RecordVideo = (props: RecordVideoProps) => {
  const {isActive, onInactive} = props;
  const devices = useCameraDevices();
  const camera = useRef<Camera>(null);
  const device = devices.back;

  const [media, setMedia] = React.useState<MediaType>();

  const handleFocus = useCallback(
    async ({nativeEvent}: GestureResponderEvent) => {
      await camera?.current?.focus({
        x: Math.round(nativeEvent.pageX),
        y: Math.round(nativeEvent.pageX),
      });
    },
    [],
  );

  const onMediaCaptured = useCallback(
    (file: PhotoFile | VideoFile, type: 'photo' | 'video') =>
      setMedia({path: file.path, type}),
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
        video
        audio // optional
      />
      <CloseButton onPress={onInactive} />

      <View style={styles.wrapper} pointerEvents={'box-none'}>
        <CaptureButton
          camera={camera}
          style={styles.captureButton}
          onMediaCaptured={onMediaCaptured}
        />
      </View>

      <MediaPreview
        mediaPath={media?.path}
        type={media?.type}
        onInactive={() => setMedia(undefined)}
      />
    </CameraWarper>
  );
};

export default RecordVideo;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: CONTENT_PADDING,
    alignSelf: 'center',
  },
});
