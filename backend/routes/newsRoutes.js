import {
  createPublicNewsPost,
  createSettingNewsPost,
  deleteSettingNewsPost,
  getPublicNewsPost,
  listPublicNewsPosts,
  listSettingNewsPosts,
  updateSettingNewsPost,
} from '../controllers/newsController.js'

export const newsRoutes = [
  { method: 'GET', path: '/api/news-posts', handler: listPublicNewsPosts },
  { method: 'POST', path: '/api/news-posts', handler: createPublicNewsPost },
  { method: 'GET', path: /^\/api\/news-posts\/([^/]+)$/, params: ['slug'], handler: getPublicNewsPost },
  { method: 'GET', path: '/api/settings/news-posts', handler: listSettingNewsPosts },
  { method: 'POST', path: '/api/settings/news-posts', handler: createSettingNewsPost },
  { method: 'POST', path: /^\/api\/settings\/news-posts\/([^/]+)$/, params: ['slug'], handler: updateSettingNewsPost },
  { method: 'DELETE', path: /^\/api\/settings\/news-posts\/([^/]+)$/, params: ['slug'], handler: deleteSettingNewsPost },
]
