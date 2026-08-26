import React, { FC, ReactNode } from "react";

interface NotificationOpenModalProps {
  body: string | ReactNode;
  createdAt: string;
}

const NotificationOpenModal: FC<NotificationOpenModalProps> = ({
  body,
  createdAt,
}) => {
  return (
    <>
      <p className="mt-2 text-sm text-gray-500">{body}</p>
      <p className="mt-4 text-xs text-gray-400">
        {new Date(createdAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })}
        {/* {new Date(created_at).toLocaleString()} */}
      </p>
    </>
  );
};

export default NotificationOpenModal;
