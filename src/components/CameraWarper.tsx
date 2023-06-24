import React from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

interface CameraWarperProps {
  isActive: boolean;
  onInactive?: () => void;
  children: React.ReactNode;
  loading?: boolean;
}

const CameraWarper = (props: CameraWarperProps) => {
  const {isActive, onInactive, children, loading} = props;

  return (
    <Modal
      visible={isActive}
      onRequestClose={onInactive}
      style={styles.container}>
      <SafeAreaView style={StyleSheet.absoluteFill}>
        {loading ? <ActivityIndicator style={styles.loading} /> : children}
        <Button onPress={onInactive} title="Close" />
      </SafeAreaView>
    </Modal>
  );
};

export default CameraWarper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
