// routes/chat.routes.js
import express from 'express';
import { getMessages, sendMessage } from './chat.controller.js';


const router = express.Router();

router.get('/:userId', getMessages);
router.post('/', sendMessage);

export default router;