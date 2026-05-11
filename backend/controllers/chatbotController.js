import { json, readJson } from '../utils/http.js'

export async function createChatbotTrial(request) {
  const body = await readJson(request)

  return json(201, {
    ok: true,
    message: 'AI chatbot trial request received. A paid plan can be activated after the trial.',
    trial: {
      duration: '7 days',
      nextStep: 'The Cromgen team will verify business details and share the demo setup.',
    },
    request: body,
  })
}
