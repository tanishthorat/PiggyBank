import React from "react";
import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";

const Modal = forwardRef(function Modal(
  { children, buttonCaption, addMoney },
  ref
) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-slate-900/90 p-4 rounded-md">
      {children}
      <form method="dialog" className="mt-4 flex justify-center">
        <Button
          className={
            "px-2 py-1 text-s md:text-base rounded bg-pink-500 text-black-800 hover:bg-pink-800 hover:text-stone-100"
          }
        >
          {buttonCaption}
        </Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
