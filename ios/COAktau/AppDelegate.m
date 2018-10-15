/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNFIRMessaging.h"

@import PushNotifications;
@import GoogleMaps;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  // DEBUG:
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  //RELEASE: jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"COAktau"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [FIRApp configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  
  [[PushNotifications shared] startWithInstanceId:@"0d07a9a7-9818-4a04-b7af-bcc9457afe4e"];
  [[PushNotifications shared] registerForRemoteNotifications];
  
  [GMSServices provideAPIKey:@"AIzaSyDeyZoP-KU9RajmzDlm8CJb38tK1wnBZwE"];
  
  UIUserNotificationType notificationTypes = UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound;
  UIUserNotificationSettings *pushNotificationSettings = [UIUserNotificationSettings settingsForTypes:notificationTypes categories: nil];
  [application registerUserNotificationSettings:pushNotificationSettings];
  [application registerForRemoteNotifications];
  
  return YES;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [[PushNotifications shared] registerDeviceToken:deviceToken completion:^{
    NSError *anyError;
    [[PushNotifications shared] subscribeWithInterest:@"kaz" error:&anyError completion:^{
      NSLog(@"Subscribed hehe");
    }];
  }];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [[PushNotifications shared] handleNotificationWithUserInfo:userInfo];
  NSLog(@"%@", userInfo);
}

-(void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  NSLog(@"Remote notification support is unavailable due to error: %@", error.localizedDescription);
}

@end
