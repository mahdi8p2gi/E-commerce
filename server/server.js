import express from "express";
import http from "http";
import { Server } from "socket.io";  // اضافه کردن socket.io
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import chatRoutes from '../server/chat/chat.routes.js';  // تغییر مسیر به درست

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.get('/', (req, res) => {
  res.send("✅ سرور وصل شد!");
});

app.use('/api/user', userRouter);
app.use('/api/chat', chatRoutes);

// ساخت server HTTP جداگانه برای socket.io
const server = http.createServer(app);

// راه‌اندازی Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ذخیره کانکشن‌ها بر اساس userId برای ارسال پیام‌ها به کلاینت خاص
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('🔌 یک کلاینت متصل شد:', socket.id);

  // وقتی کاربر با userId میاد (از کلاینت)
  socket.on('user_connected', (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log('کاربر آنلاین:', userId);
  });

  // وقتی پیام از کلاینت میاد
  socket.on('send_message', async (data) => {
    // data باید شامل: sender, message, userId باشه

    // ذخیره پیام تو دیتابیس (مثل sendMessage API)
    try {
      const ChatMessage = (await import('./models/chat.model.js')).default;
      const newMsg = new ChatMessage(data);
      await newMsg.save();

      // ارسال پیام به خود فرستنده
      socket.emit('receive_message', newMsg);

      // ارسال پیام به ادمین (اگر آنلاین باشه)
      const adminSocketId = onlineUsers.get('admin');
      if (adminSocketId) {
        io.to(adminSocketId).emit('receive_message', newMsg);
      }

      // ارسال پیام به کاربر (اگر فرستنده ادمین بود، پیام به کاربر ارسال می‌شود)
      if(data.sender === 'admin') {
        const userSocketId = onlineUsers.get(data.userId);
        if(userSocketId) {
          io.to(userSocketId).emit('receive_message', newMsg);
        }
      }
    } catch (err) {
      console.error("خطا در ذخیره پیام:", err.message);
    }
  });

  // وقتی کلاینت قطع شد
  socket.on('disconnect', () => {
    console.log('⛔️ کلاینت قطع شد:', socket.id);
    // حذف کاربر از آنلاین‌ها
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

// اجرا سرور با Socket.IO به جای app.listen
const startServer = async () => {
  try {
    await connectdb();
    server.listen(port, () => {
      console.log(`🚀 سرور با Socket.IO در حال اجرا: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ سرور اجرا نشد:", error.message);
  }
};

startServer();
