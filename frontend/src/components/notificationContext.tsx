import React, { createContext, useContext, useMemo } from "react";
import { notification } from "antd";

type NotificationContextType = {
  openNotification: (title: string, desc: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (title: string, desc: string) => {
    api.open({
      message: title,
      description: desc,
      duration: 3,
    });
  };

  const value = useMemo(() => ({ openNotification }), [api]);

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
