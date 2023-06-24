import React from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import TakePicture from './src/components/TakePicture';
import {requestCameraPermission} from './src/utils/camera-permission';

type ActivatingCamera = 'TakePicture' | 'RecordVideo';

function App(): JSX.Element {
  const [activatingCamera, setActivatingCamera] =
    React.useState<ActivatingCamera | null>(null);

  const handelOpenCamera = async (type: ActivatingCamera) => {
    const cameraPermission = await requestCameraPermission();
    if (cameraPermission === 'authorized') {
      setActivatingCamera(type);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Take Picture"
        onPress={() => handelOpenCamera('TakePicture')}
      />

      <TakePicture
        isActive={activatingCamera === 'TakePicture'}
        onInactive={() => setActivatingCamera(null)}
      />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
