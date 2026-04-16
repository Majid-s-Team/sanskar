import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "../config/firebase";

export const requestPermission = async () => {
  const supported = await isSupported();

  if (!supported) {
    console.log("Browser not supported");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    console.log("FCM Token:", token);
    return token;
  }
};
