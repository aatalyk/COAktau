import { Platform } from 'react-native';
import FCM, {
	FCMEvent,
	NotificationType,
	WillPresentNotificationResult,
	RemoteNotificationResult
} from 'react-native-fcm';

export const setupFCM = () => {
	FCM.requestPermissions();
	FCM.getFCMToken().then(token => {});
	FCM.subscribeToTopic('secret-chatroom');

	FCM.on(FCMEvent.Notification, async notif => {
		if (Platform.OS === 'ios') {
			switch (notif._notificationType) {
				case NotificationType.Remote:
					notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
					break;
				case NotificationType.NotificationResponse:
					notif.finish();
					break;
				case NotificationType.WillPresent:
					notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
					break;
			}
		}
	});

	FCM.on(FCMEvent.RefreshToken, token => {});
};
