import React, {useMemo} from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CONTENT_PADDING} from './contains';

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
        <TouchableOpacity onPress={onInactive} style={styles.closeButton}>
          <Text>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default MediaPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    margin: CONTENT_PADDING,
    backgroundColor: '#ffffff80',
    display: 'flex',
  },
});
