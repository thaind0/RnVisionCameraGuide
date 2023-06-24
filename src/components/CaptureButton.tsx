import React, {RefObject, useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import {Camera, PhotoFile, VideoFile} from 'react-native-vision-camera';
import {CAPTURE_BUTTON_SIZE} from './contains';

interface CaptureButtonProps extends ViewProps {
  camera: RefObject<Camera>;
  onMediaCaptured: (
    media: PhotoFile | VideoFile,
    type: 'photo' | 'video',
  ) => void;
}

const CaptureButton = (props: CaptureButtonProps) => {
  const {camera, onMediaCaptured, style, ...rest} = props;
  const [isRecording, setIsRecording] = React.useState(false);

  const innerStyle = useMemo(
    () => ({
      backgroundColor: isRecording ? 'red' : 'white',
    }),
    [isRecording],
  );

  const takePhoto = useCallback(async () => {
    if (isRecording) {
      setIsRecording(false);
      return camera.current?.stopRecording();
    }
    const photo = await camera.current?.takePhoto();
    onMediaCaptured(photo!, 'photo');
  }, [camera, onMediaCaptured, isRecording]);

  const startRecordingVideo = useCallback(async () => {
    setIsRecording(true);
    return camera.current?.startRecording({
      onRecordingFinished: video => onMediaCaptured(video, 'video'),
      onRecordingError: error => console.error(error),
    });
  }, [camera, onMediaCaptured]);

  return (
    <TouchableOpacity
      {...rest}
      style={[styles.captureButton, style]}
      onPress={takePhoto}
      onLongPress={startRecordingVideo}>
      <View style={[styles.captureButtonInner, innerStyle]} />
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
  },
});
