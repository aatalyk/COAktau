//
//  NotificationManager.m
//  COAktau
//
//  Created by Mac on 03.09.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "NotificationManager.h"
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@import PushNotifications;

@implementation NotificationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(enableNotification:(NSString *)lang) {
  NSError *error;
  if([lang isEqualToString:@"rus"]) {
    [[PushNotifications shared] subscribeWithInterest:@"rus" error:&error completion:^{}];
  } else {
    [[PushNotifications shared] subscribeWithInterest:@"kaz" error:&error completion:^{}];
  }
}

RCT_EXPORT_METHOD(disableNotification) {
  NSError *error;
  [[PushNotifications shared] unsubscribeWithInterest:@"rus" error:&error completion:^{}];
  [[PushNotifications shared] unsubscribeWithInterest:@"kaz" error:&error completion:^{}];
}

RCT_EXPORT_METHOD(subscribeRus) {
  NSError *error;
  [[PushNotifications shared] unsubscribeWithInterest:@"kaz" error:&error completion:^{}];
  [[PushNotifications shared] subscribeWithInterest:@"rus" error:&error completion:^{}];
}

RCT_EXPORT_METHOD(subscribeKaz) {
  NSError *error;
  [[PushNotifications shared] unsubscribeWithInterest:@"rus" error:&error completion:^{}];
  [[PushNotifications shared] subscribeWithInterest:@"kaz" error:&error completion:^{}];
}

@end
