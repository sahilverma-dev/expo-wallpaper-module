import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoWallpaperModuleViewProps } from './ExpoWallpaperModule.types';

const NativeView: React.ComponentType<ExpoWallpaperModuleViewProps> =
  requireNativeViewManager('ExpoWallpaperModule');

export default function ExpoWallpaperModuleView(props: ExpoWallpaperModuleViewProps) {
  return <NativeView {...props} />;
}
