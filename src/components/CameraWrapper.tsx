import React from 'react';
import {ActivityIndicator, Modal, SafeAreaView, StyleSheet} from 'react-native';

interface CameraWrapperProps {
  isActive: boolean;
  onInactive?: () => void;
  children: React.ReactNode;
  loading?: boolean;
}

const CameraWrapper = (props: CameraWrapperProps) => {
  const {isActive, onInactive, children, loading} = props;

  return (
    <Modal
      visible={isActive}
      onRequestClose={onInactive}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        {loading ? <ActivityIndicator style={styles.loading} /> : children}
      </SafeAreaView>
    </Modal>
  );
};

export default CameraWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
