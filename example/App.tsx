import { StyleSheet, Text, View } from 'react-native';

import * as ExpoWallpaperModule from 'expo-wallpaper-module';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoWallpaperModule.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
