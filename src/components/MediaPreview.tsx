import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Video from 'react-native-video';
import CloseButton from './common/CloseButton';
import {requestSavePermission} from '../utils/save-permission';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

interface MediaPreviewProps {
  mediaPath?: string;
  type?: 'photo' | 'video';
  onInactive?: () => void;
}

const MediaPreview = ({mediaPath, type, onInactive}: MediaPreviewProps) => {
  const source = useMemo(() => ({uri: mediaPath}), [mediaPath]);
  const [saveStatus, setSaveStatus] = React.useState<
    'saving' | 'saved' | 'error'
  >();

  const handleSave = useCallback(async () => {
    setSaveStatus('saving');
    const hasPermission = await requestSavePermission();

    if (hasPermission) {
      await CameraRoll.save(`file://${mediaPath}`, {
        type,
      });
      setSaveStatus('saved');
    }
  }, [mediaPath, type]);

  useEffect(() => {
    return () => {
      setSaveStatus(undefined);
    };
  }, []);

  const onClose = useCallback(() => {
    onInactive?.();
    setSaveStatus(undefined);
  }, [onInactive]);

  return (
    <Modal visible={!!mediaPath} onRequestClose={onClose}>
      <SafeAreaView style={[StyleSheet.absoluteFill]}>
        {type === 'video' ? (
          <Video
            source={source}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            posterResizeMode="cover"
            allowsExternalPlayback={false}
            automaticallyWaitsToMinimizeStalling={false}
            disableFocus={true}
            repeat={true}
            useTextureView={false}
            controls={false}
            playWhenInactive={true}
          />
        ) : (
          <Image
            source={source}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        )}
        <View style={styles.buttonsContainer}>
          <CloseButton onPress={onClose} />
          {saveStatus === 'saving' ? (
            <ActivityIndicator />
          ) : (
            <Button
              onPress={handleSave}
              disabled={saveStatus === 'saved'}
              title={saveStatus === 'saved' ? 'Saved' : 'Save'}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MediaPreview;

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
