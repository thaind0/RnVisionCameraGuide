import React, {useMemo} from 'react';
import {Image, Modal, SafeAreaView, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import CloseButton from './common/CloseButton';

interface MediaPreviewProps {
  mediaPath?: string;
  type?: 'photo' | 'video';
  onInactive?: () => void;
}

const MediaPreview = ({mediaPath, type, onInactive}: MediaPreviewProps) => {
  const source = useMemo(() => ({uri: mediaPath}), [mediaPath]);

  return (
    <Modal visible={!!mediaPath} onRequestClose={onInactive}>
      <SafeAreaView style={[StyleSheet.absoluteFill]}>
        {type === 'photo' && (
          <Image
            source={source}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        )}
        {type === 'video' && (
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
        )}
        <CloseButton onPress={onInactive} />
      </SafeAreaView>
    </Modal>
  );
};

export default MediaPreview;
