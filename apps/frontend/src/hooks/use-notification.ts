import { useContext } from 'react';
import { NotificationContext } from '@/context/notification';

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) throw new Error('Notification context is null');

  return context;
};
