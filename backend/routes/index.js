import { authRoutes } from './authRoutes.js'
import { applicationRoutes } from './applicationRoutes.js'
import { chatbotRoutes } from './chatbotRoutes.js'
import { contractRoutes } from './contractRoutes.js'
import { jobRoutes } from './jobRoutes.js'
import { leadRoutes } from './leadRoutes.js'
import { newsRoutes } from './newsRoutes.js'
import { policyRoutes } from './policyRoutes.js'
import { projectRoutes } from './projectRoutes.js'
import { serviceRoutes } from './serviceRoutes.js'
import { serviceSampleRoutes } from './serviceSampleRoutes.js'
import { siteSettingsRoutes } from './siteSettingsRoutes.js'
import { workforceRoutes } from './workforceRoutes.js'

export const routes = [
  ...serviceRoutes,
  ...serviceSampleRoutes,
  ...applicationRoutes,
  ...authRoutes,
  ...contractRoutes,
  ...jobRoutes,
  ...projectRoutes,
  ...policyRoutes,
  ...siteSettingsRoutes,
  ...newsRoutes,
  ...leadRoutes,
  ...workforceRoutes,
  ...chatbotRoutes,
]
