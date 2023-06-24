import React, {useMemo} from 'react';
import {Button, Image, Modal, SafeAreaView, StyleSheet} from 'react-native';

interface MediaPreviewProps {
  mediaPath?: string;
  onInactive?: () => void;
}

const MediaPreview = ({mediaPath, onInactive}: MediaPreviewProps) => {
  const source = useMemo(() => ({uri: mediaPath}), [mediaPath]);

  return (
    <Modal visible={!!mediaPath} onRequestClose={onInactive}>
      <SafeAreaView style={[StyleSheet.absoluteFill]}>
        <Image source={source} style={StyleSheet.absoluteFill} />
        <Button onPress={onInactive} title="Close" />
      </SafeAreaView>
    </Modal>
  );
};

export default MediaPreview;
