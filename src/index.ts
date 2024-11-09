import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoWallpaperModule.web.ts
// and on native platforms to ExpoWallpaperModule.ts
import ExpoWallpaperModule from './ExpoWallpaperModule';
import ExpoWallpaperModuleView from './ExpoWallpaperModuleView';
import { ChangeEventPayload, ExpoWallpaperModuleViewProps } from './ExpoWallpaperModule.types';

// Get the native constant value.
export const PI = ExpoWallpaperModule.PI;

export function hello(): string {
  return ExpoWallpaperModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoWallpaperModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoWallpaperModule ?? NativeModulesProxy.ExpoWallpaperModule);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoWallpaperModuleView, ExpoWallpaperModuleViewProps, ChangeEventPayload };
