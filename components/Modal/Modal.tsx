"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const onClose = () => router.back();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
