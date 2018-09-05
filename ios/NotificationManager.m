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

@implementation NotificationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(enableNotification) {
  [[UIApplication sharedApplication] registerForRemoteNotifications];
}

RCT_EXPORT_METHOD(disableNotification) {
  [[UIApplication sharedApplication] unregisterForRemoteNotifications];
}

@end
