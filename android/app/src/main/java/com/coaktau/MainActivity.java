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
        Log.d("Hello", "World");
        PushNotifications.start(getApplicationContext(), "4db53e99-e2d5-4d12-b1a5-273bf7c6c363");
        PushNotifications.subscribe("soaktau");
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
