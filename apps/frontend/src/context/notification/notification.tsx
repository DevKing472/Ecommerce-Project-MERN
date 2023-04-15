import React from 'react';
import { useTimeout } from '@/hooks/use-timeout';
import { Notification } from '@/types';

interface Props extends Partial<Notification> {
  close: () => void;
  reactKey: number;
}

export function Notification(props: Props) {
  useTimeout(props.close, 5000);

  const customClass = props.customClass
    ? `Notification ${props.customClass}`
    : 'Notification';

  return (
    <div className={customClass} data-react-key={props.reactKey}>
      <div className="header">
        <h5>{props.title}</h5>
        <button onClick={props.close}>X</button>
      </div>
      <hr />
      <p>{props.content}</p>
    </div>
  );
}
