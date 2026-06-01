"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick} role="dialog">
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
