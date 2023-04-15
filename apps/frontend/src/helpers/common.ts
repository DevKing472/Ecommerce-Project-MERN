import { RefObject } from 'react';

export function copyShippingToBilling(
  source: RefObject<HTMLInputElement>,
  target: RefObject<HTMLInputElement>
) {
  if (source.current && source.current.value !== '' && target.current) {
    target.current.value = source.current.value;
    target.current.focus();
  }
}

export function checkRefFields(fields: RefObject<HTMLInputElement>[]) {
  return fields.every((item) => item.current?.value);
}

export function checkFields(fields: HTMLInputElement[]) {
  return fields.every((item) => item.value !== '');
}
