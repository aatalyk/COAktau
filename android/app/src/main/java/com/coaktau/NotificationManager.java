package com.coaktau;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.pusher.pushnotifications.PushNotifications;

public class NotificationManager extends ReactContextBaseJavaModule {

    public NotificationManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NotificationManager";
    }

    @ReactMethod
    public void enableNotification(String lang) {
        if(lang.equals("rus")) {
            PushNotifications.subscribe("rus");
        } else {
            PushNotifications.subscribe("kaz");
        }
    }

    @ReactMethod
    public void disableNotification() {
        PushNotifications.unsubscribe("rus");
        PushNotifications.unsubscribe("kaz");
    }

    @ReactMethod
    public void subscribeRus() {
        PushNotifications.unsubscribe("kaz");
        PushNotifications.subscribe("rus");
        Log.v("rus", "msg");
    }

    @ReactMethod
    public void subscribeKaz() {
        PushNotifications.unsubscribe("rus");
        PushNotifications.subscribe("kaz");
        Log.v("kaz", "msg");
    }
}