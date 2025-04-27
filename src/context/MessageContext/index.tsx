import React, { createContext, useContext } from "react";
import { message } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MessageContext = createContext<any>(null); // Initialize the context with MessageInstance | null type

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
