import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class Notifications {
  constructor() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
    
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders', // (required)
        channelName: 'Task reminder notifications', // (required)
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN --- ', rn);
    });
  }

   localNotification = (title,body) => {
    PushNotification.localNotification({
      channelId: "reminders",
      title: title || "Default Title",
      message: body || "Default Message",
      playSound: true,
      soundName: "default",
      largeIcon: null,
      smallIcon: null,
    });
  };
  schduleNotification(date,id,name) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: '🔔 Reminder!',
      message: `You have pending Task ${name}`,
      date,
      id 
   
    });
  }
  cancelNotification(id){
    console.log("Notification Canceled => ",id)
    PushNotification.cancelLocalNotification(id);
  }
}

export default new Notifications();