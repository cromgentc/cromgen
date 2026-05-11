import { json } from '../utils/http.js'

const services = [
  'Artificial Intelligence',
  'Digital Marketing',
  'Call Center Service',
  'IT Services',
  'Software Development Services',
  'HR Consultant',
  'Telecommunications',
]

export function health() {
  return json(200, {
    ok: true,
    service: 'cromgentechnology-backend',
    db: true,
    message: 'Backend API is running',
  })
}

export function listServices() {
  return json(200, { services })
}
