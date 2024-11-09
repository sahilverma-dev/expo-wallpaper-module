package expo.modules.wallpapermodule


import android.app.WallpaperManager

import android.graphics.BitmapFactory
import android.os.Build

import androidx.annotation.RequiresApi
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.InputStream
import java.net.URL

class ExpoWallpaperModule : Module() {


    @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
    override fun definition() = ModuleDefinition {
        Name("ExpoWallpaperModule")


        AsyncFunction("setWallpaperFromUrl") { url: String, location: String ->
            try {
                val wallpaperManager = WallpaperManager.getInstance(appContext.reactContext)
                val inputStream: InputStream = URL(url).openStream()
                val bitmap = BitmapFactory.decodeStream(inputStream)

                when (location.lowercase()) {
                    "home" -> {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                            wallpaperManager.setBitmap(
                                bitmap,
                                null,
                                true,
                                WallpaperManager.FLAG_SYSTEM
                            )
                        } else {
                            wallpaperManager.setBitmap(bitmap)
                        }
                    }

                    "lock" -> {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                            wallpaperManager.setBitmap(
                                bitmap,
                                null,
                                true,
                                WallpaperManager.FLAG_LOCK
                            )
                        } else {
                            throw Exception("Lock screen wallpaper requires Android N or higher")
                        }
                    }

                    "both" -> {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                            wallpaperManager.setBitmap(
                                bitmap,
                                null,
                                true,
                                WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK
                            )
                        } else {
                            wallpaperManager.setBitmap(bitmap)
                        }
                    }

                    else -> throw Exception("Invalid location. Use 'home', 'lock', or 'both'")
                }

                inputStream.close()
                bitmap.recycle()

                "Wallpaper set successfully to $location screen"
            } catch (e: Exception) {
                throw Exception("Failed to set wallpaper: ${e.message}")
            }
        }

        Function("isWallpaperSupported") {
            return@Function WallpaperManager.getInstance(appContext.reactContext)
                .isWallpaperSupported
        }


        // Function to get supported features
        Function("getSupportedFeatures") {
            mapOf(
                "supportsLockScreen" to (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N),
                "androidVersion" to Build.VERSION.SDK_INT
            )
        }

    }
}
