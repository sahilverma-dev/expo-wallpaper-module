import ExpoWallpaperModule from "./ExpoWallpaperModule";

/**
 * Valid locations for setting wallpaper
 */
export type Location = "home" | "lock" | "both";

/**
 * Error class for wallpaper-specific errors
 */
export class WallpaperError extends Error {
  constructor(
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "WallpaperError";
  }
}

/**
 * Validates if a string is a valid URL
 */
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sets wallpaper from a given URL for specified screen location
 * @param url - The URL of the image to set as wallpaper
 * @param location - Where to set the wallpaper (`home`, `lock`, or `both`)
 * gives success message if wallpaper set successfully
 * @throws {WallpaperError} If the URL is invalid or setting wallpaper fails
 */

export const setWallpaperFromUrl = async ({
  url,
  location,
}: {
  url: string;
  location: Location;
}): Promise<string> => {
  // Input validation
  if (!url || typeof url !== "string") {
    throw new WallpaperError("URL must be a non-empty string");
  }

  if (!isValidUrl(url)) {
    throw new WallpaperError("Invalid URL format");
  }

  if (!location || !["home", "lock", "both"].includes(location)) {
    throw new WallpaperError("Invalid location specified");
  }

  try {
    // Await the native module call to properly handle async operation
    return (await ExpoWallpaperModule.setWallpaperFromUrl(
      url,
      location
    )) as string;
  } catch (error) {
    throw new WallpaperError(
      "Failed to set wallpaper",
      error instanceof Error ? error : new Error(String(error))
    );
  }
};

/**
 * Type guard to check if an error is a WallpaperError
 */
export const isWallpaperError = (error: unknown): error is WallpaperError => {
  return error instanceof WallpaperError;
};
