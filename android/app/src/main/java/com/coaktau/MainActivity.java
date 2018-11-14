package com.coaktau;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.nikolaiwarner.RNTextInputReset.RNTextInputResetPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.pusher.pushnotifications.PushNotifications;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        PushNotifications.start(getApplicationContext(), "0d07a9a7-9818-4a04-b7af-bcc9457afe4e");
        PushNotifications.subscribe("kaz");
    }

    @Override
    public void onNewIntent(Intent intent) {
         super.onNewIntent(intent);
         setIntent(intent);
    }

    @Override
    protected String getMainComponentName() {
        return "COAktau";
    }
}
