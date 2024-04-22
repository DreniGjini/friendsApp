const sendNotification = (title: string, body: string, iconUrl?: string) => {
  if (!('Notification' in window)) {
    alert('This browser does not support system notifications');
  } else if (Notification.permission === 'granted') {
    const options: NotificationOptions = {
      body: body,
    };
    if (iconUrl) {
      options.icon = iconUrl;
    }
    new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const options: NotificationOptions = {
          body: body,
        };
        if (iconUrl) {
          options.icon = iconUrl;
        }
        new Notification(title, options);
      }
    });
  }
};
export default sendNotification;
