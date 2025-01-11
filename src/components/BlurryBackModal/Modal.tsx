import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  className,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center py-10 justify-center">
      {/* Blurry background */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <AnimatePresence>
        <motion.div
          className={cn(
            "relative z-10 w-11/12 max-w-lg bg-white rounded-md shadow-lg",
            className
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center top-3 right-6 text-3xl text-gray-500 hover:text-gray-700 z-30 cursor-pointer"
          >
            <IoMdClose />
          </button>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
