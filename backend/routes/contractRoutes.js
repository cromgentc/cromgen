import {
  createSettingContract,
  deleteSettingContract,
  getPublicContractFile,
  getPublicContractHtml,
  getPublicSignedContractFile,
  getPublicContractForSigning,
  listSettingContracts,
  signCompanyPublicContract,
  signPublicContract,
  updateSettingContract,
} from '../controllers/contractController.js'

export const contractRoutes = [
  { method: 'GET', path: '/api/settings/contracts', handler: listSettingContracts },
  { method: 'POST', path: '/api/settings/contracts', handler: createSettingContract },
  { method: 'POST', path: /^\/api\/settings\/contracts\/([^/]+)$/, params: ['token'], handler: updateSettingContract },
  { method: 'DELETE', path: /^\/api\/settings\/contracts\/([^/]+)$/, params: ['token'], handler: deleteSettingContract },
  { method: 'GET', path: /^\/api\/contracts\/([^/]+)\/file$/, params: ['token'], handler: getPublicContractFile },
  { method: 'GET', path: /^\/api\/contracts\/([^/]+)\/html$/, params: ['token'], handler: getPublicContractHtml },
  { method: 'GET', path: /^\/api\/contracts\/([^/]+)\/signed-file$/, params: ['token'], handler: getPublicSignedContractFile },
  { method: 'POST', path: /^\/api\/contracts\/([^/]+)\/company-sign$/, params: ['token'], handler: signCompanyPublicContract },
  { method: 'GET', path: /^\/api\/contracts\/([^/]+)$/, params: ['token'], handler: getPublicContractForSigning },
  { method: 'POST', path: /^\/api\/contracts\/([^/]+)$/, params: ['token'], handler: signPublicContract },
  { method: 'GET', path: /^\/api\/contracts\/sign\/([^/]+)$/, params: ['token'], handler: getPublicContractForSigning },
  { method: 'POST', path: /^\/api\/contracts\/sign\/([^/]+)$/, params: ['token'], handler: signPublicContract },
]
