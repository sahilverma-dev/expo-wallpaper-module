import { Button, StyleSheet, Text, View } from "react-native";

import * as ExpoWallpaperModule from "expo-wallpaper-module";

export default function App() {
  const click = async () => {
    try {
      console.log("settting wallpaper");
      const msg = await ExpoWallpaperModule.setWallpaperFromUrl({
        url: "https://e1.pxfuel.com/desktop-wallpaper/453/1/desktop-wallpaper-324861-sunrise-illustration-digital-art-phone-backgrounds-and.jpg",
        location: "home",
      });

      console.log(msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="click" onPress={() => click()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
