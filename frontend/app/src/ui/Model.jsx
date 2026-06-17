
import '../index.css';
import { cloneElement, createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('')
  
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName } = useContext(ModalContext);

  if (name !== openName) return null;

  return (
    <div className="containers Overlay">
      <div className="Modal">
        {children}
      </div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;