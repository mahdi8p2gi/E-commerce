// src/components/ChatWidget.jsx
import { useState } from "react";
import { useChat } from "../context/ChatContext";
import toast from "react-hot-toast";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const { messages, sendMessage } = useChat();

  const handleSend = () => {
    if (!msg.trim()) {
      toast.error("Please enter a message!");
      return;
    }
    sendMessage(msg);
    setMsg("");
  };

  return (
    <div className="fixed z-50 bottom-5 left-5">
      {open ? (
        <div className="flex flex-col bg-white rounded-lg shadow-lg w-80 h-96">
          <div className="flex items-center justify-between p-2 text-white rounded-t-lg bg-primary">
            <span>💬 Online Support</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 p-2 space-y-2 overflow-y-auto">
            <div className="text-sm text-gray-500">👋 Hi! You can ask your question here.</div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg text-sm max-w-[75%] ${m.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  {m.message}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-2 border-t">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border rounded"
              placeholder="Type your message..."
            />
            <button onClick={handleSend} className="px-3 py-1 text-sm text-white rounded bg-primary">
              Send
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="px-4 py-2 text-white rounded-full shadow-md bg-primary">
          💬
        </button>
      )}
    </div>
  );
};

export default ChatWidget;