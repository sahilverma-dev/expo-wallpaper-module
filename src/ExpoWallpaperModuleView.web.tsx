import * as React from 'react';

import { ExpoWallpaperModuleViewProps } from './ExpoWallpaperModule.types';

export default function ExpoWallpaperModuleView(props: ExpoWallpaperModuleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
