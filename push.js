const webPush = require('web-push');

const vapidKeys = {
  publicKey:
    'BLBK1NVUYXhyJpO2aMux8gkPEkmbmQ3fXz9Xo_3GSssU_orDhLeYaFtLssO_LnrRU_czIjEE2UgFTQhanCT9hRQ',
  privateKey: '9JYLs8G5QtFmh9BTN8jDNwXFeENoERE9wTz3c4IyNV0',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

// jangan lupa ya setiap buka web di device baru endpoint dan key nya berubah jadi harus diganti diganti terus
const pushSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/eiAALNGYvME:APA91bG-_fzQUxQtIg6saMbkWKktG_HdBrL8_WZBdi71g94PveazcWlf1TBvQ1-ZG-LM5DC8_lx2klOVOJ9_7xeZGkwhPwcLwl8AR52QdXxQT8fKAf6_ToZ5TFaJ1t2m9tfaYJpV9EHi',
  keys: {
    p256dh:
      'BO1AWEu8uMm0EXoY0FpHVDQHucCkxNKk+FQweXGEx4Jq+JnEJ0TcornWihvjqyRdQiERbJQSLUc6DoGz1YmE+Us=',
    auth: '+w7rmjH22nAgA23foUl4hA==',
  },
};
const payload = 'pesan dari push notification';
const options = {
  gcmAPIKey: '580211239650',
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
