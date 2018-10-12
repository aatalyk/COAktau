package com.coaktau;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.pusher.pushnotifications.PushNotifications;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        PushNotifications.start(getApplicationContext(), "0d07a9a7-9818-4a04-b7af-bcc9457afe4e");
        PushNotifications.subscribe("kaz");
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */


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
