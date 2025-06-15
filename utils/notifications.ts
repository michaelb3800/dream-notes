import * as Notifications from 'expo-notifications';
import { addDays, setHours, setMinutes } from 'date-fns';

export async function scheduleDailyReminder() {
  const trigger = setMinutes(setHours(new Date(), 19), 0);
  if (trigger < new Date()) {
    trigger.setDate(trigger.getDate() + 1);
  }
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Study streak!', body: 'Time to review your notes.' },
    trigger: { hour: trigger.getHours(), minute: trigger.getMinutes(), repeats: true },
  });
}
