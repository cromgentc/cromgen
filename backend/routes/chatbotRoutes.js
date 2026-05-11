import { createChatbotTrial } from '../controllers/chatbotController.js'

export const chatbotRoutes = [{ method: 'POST', path: '/api/chatbot-trial', handler: createChatbotTrial }]
