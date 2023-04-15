import React, { useState, useMemo, useEffect, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { NotificationContext } from './notification-context';
import { Notification } from './notification';
import { Notification as INotification } from '@/types';

export function NotificationProvider(props: PropsWithChildren) {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const open = (title: string, content: string, customClass?: 'error') => {
    setNotifications((currentNotifications) => [
      ...currentNotifications,
      { id: Math.random(), content, title, customClass },
    ]);
  };

  const close = (id: number) => {
    const element = document.querySelector(
      `.Notification[data-react-key="${id.toString()}"]`
    );
    element?.classList.add('hide');
    setTimeout(
      () =>
        setNotifications((currentNotifications) =>
          currentNotifications.filter((notification) => notification.id !== id)
        ),
      300
    );
  };

  const contextValue = useMemo(
    () => ({ id: 0, content: '', title: '', open, close }),
    []
  );

  if (!mounted) return null;

  return (
    <NotificationContext.Provider value={contextValue}>
      {props.children}

      {mounted
        ? createPortal(
            <div className="notification-wrapper">
              {notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  close={() => close(notification.id)}
                  reactKey={notification.id}
                  title={notification.title}
                  content={notification.content}
                  customClass={
                    notification.customClass
                      ? notification.customClass
                      : undefined
                  }
                />
              ))}
            </div>,
            document.body
          )
        : null}
    </NotificationContext.Provider>
  );
}
