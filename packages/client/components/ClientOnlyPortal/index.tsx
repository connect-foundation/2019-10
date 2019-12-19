import { createPortal } from 'react-dom';

export const ClientOnlyPortal = ({ children, selector, mounted }) => {
  return mounted
    ? createPortal(children, document.querySelector(selector))
    : null;
};
