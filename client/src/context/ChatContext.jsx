import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ساخت کانتکست
const ChatContext = createContext();

// تولید userId تصادفی (مثلاً یک uuid ساده)
const generateUserId = () => {
  return 'user-' + Math.random().toString(36).substring(2, 10);
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // گرفتن یا ساختن userId
  const getUserId = () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = generateUserId();
      localStorage.setItem("userId", userId);
    }
    return userId;
  };

  const userId = getUserId();

  // ارسال پیام
  const sendMessage = async (text) => {
    const newMsg = { message: text, sender: "user", userId };

    // نمایش پیام سمت کاربر فوراً
    setMessages((prev) => [...prev, newMsg]);

    try {
      await axios.post("http://localhost:5000/api/chat", newMsg);
    } catch (err) {
      console.error("Error sending message:", err.message);
    }
  };

  // گرفتن پیام‌ها از سرور
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/${userId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err.message);
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
