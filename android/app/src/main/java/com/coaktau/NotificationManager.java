package com.coaktau;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NotificationManager extends ReactContextBaseJavaModule {

    public NotificationManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NotificationManager";
    }

    @ReactMethod
    public void enableNotification() {
        Log.d("Enable", "Notif");
    }

    @ReactMethod
    public void disableNotification() {
        Log.d("Disable", "Notif");
    }
}