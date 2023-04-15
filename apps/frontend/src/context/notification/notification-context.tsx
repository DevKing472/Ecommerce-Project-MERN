import { Notification } from '@/types';
import { createContext } from 'react';

export interface INotificationContext extends Notification {
  open: (title: string, content: string, customClass?: 'error') => void;
  close: (close: number) => void;
}

export const NotificationContext = createContext<INotificationContext | null>(
  null
);
