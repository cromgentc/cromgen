import { useEffect, useRef, useState } from 'react'
import { API_ENDPOINT, CONTRACT_ENDPOINTS, apiRequest } from '../api/apiEndpoint.js'

const emptySignatures = {
  companySignatureName: 'Cromgen Technology',
  companySignatureData: '',
  signatureName: '',
  signerEmail: '',
  signatureData: '',
  signatureUpload: '',
  contractDate: '',
  contractTimestamp: '',
  finalContractBody: '',
  signaturePlacements: [],
}

export function ContractSigningPage({ token }) {
  const [contract, setContract] = useState(null)
  const [formData, setFormData] = useState(emptySignatures)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isDrawingCompanySign, setIsDrawingCompanySign] = useState(false)
  const [isPlacementMode, setIsPlacementMode] = useState(false)
  const [isDatePlacementMode, setIsDatePlacementMode] = useState(false)
  const [isSubmittingSignature, setIsSubmittingSignature] = useState(false)
  const [isBackendRouteUnavailable, setIsBackendRouteUnavailable] = useState(false)
  const [docxHtml, setDocxHtml] = useState('')
  const companyCanvasRef = useRef(null)
  const authRole = localStorage.getItem('cromgen_auth_role')
  const isFirstParty = ['admin', 'staff'].includes(authRole)
  const signatureType = isFirstParty ? 'company' : 'client'
  const datePlacementType = `${signatureType}-date`
  const savedSignature = isFirstParty ? formData.companySignatureData : formData.signatureData
  const canSecondPartySign = true

  useEffect(() => {
    const authToken = localStorage.getItem('cromgen_auth_token')
    const authRole = localStorage.getItem('cromgen_auth_role')
    if (authToken && ['vendor', 'admin', 'staff'].includes(authRole)) return

    const redirectPath = `${window.location.pathname}${window.location.search}`
    window.location.assign(`/vendor-login?redirect=${encodeURIComponent(redirectPath)}`)
  }, [])

  useEffect(() => {
    let isMounted = true

    apiRequest(CONTRACT_ENDPOINTS.publicSignDetail(token))
      .then((data) => {
        if (!isMounted) return
        const nextContract = data.contract || null
        const now = new Date()
        setContract(nextContract)
        setFormData({
          ...emptySignatures,
          companySignatureName: nextContract?.companySignatureName || nextContract?.senderName || 'Cromgen Technology',
          companySignatureData: nextContract?.companySignatureData || '',
          signatureName: nextContract?.signatureName || nextContract?.recipientName || '',
          signerEmail: nextContract?.signerEmail || nextContract?.recipientEmail || '',
          signatureText: '',
          signatureData: nextContract?.signatureData || '',
          signatureUpload: nextContract?.signatureUpload || '',
          contractDate: nextContract?.contractDate || now.toISOString().slice(0, 10),
          contractTimestamp: nextContract?.contractTimestamp || now.toLocaleString(),
          finalContractBody: nextContract?.finalContractBody || nextContract?.contractBody || '',
          signaturePlacements: nextContract?.signaturePlacements || [],
        })
      })
      .catch((error) => {
        if (!isMounted) return
        setStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'Unable to load contract.',
        })
      })

    return () => {
      isMounted = false
    }
  }, [token])

  useEffect(() => {
    if (!status.message) return undefined

    const timeoutId = window.setTimeout(() => {
      setStatus({ type: '', message: '' })
    }, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [status.message])

  useEffect(() => {
    if (!isCompanyModalOpen) return

    const canvas = companyCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scale = window.devicePixelRatio || 1
    canvas.width = Math.max(1, Math.floor(rect.width * scale))
    canvas.height = Math.max(1, Math.floor(rect.height * scale))

    const context = canvas.getContext('2d')
    context.scale(scale, scale)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = 2.6
    context.strokeStyle = '#101828'
  }, [isCompanyModalOpen])

  const addSignaturePlacement = (event) => {
    if (!isPlacementMode) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const label = formData.signatureName

    if (!isFirstParty && !savedSignature) {
      setStatus({ type: 'error', message: 'Please draw and save your signature first.' })
      return
    }

    setFormData((current) => ({
      ...current,
      signaturePlacements: [
        ...(current.signaturePlacements || []).filter((placement) => placement.type !== signatureType),
        {
          id: `${signatureType}-${Date.now()}`,
          type: signatureType,
          x: clampPlacementPercent(x, 10, 90),
          y: clampPlacementPercent(y, 6, 94),
          label: isFirstParty ? formData.companySignatureName : label,
          image: savedSignature || '',
        },
      ],
    }))
    setIsPlacementMode(false)
    setStatus({ type: 'success', message: 'Signature placed on document.' })
  }

  const addDatePlacement = (event) => {
    if (!isDatePlacementMode || event.detail !== 3) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const label = formData.contractTimestamp || new Date().toLocaleString()

    setFormData((current) => ({
      ...current,
      contractTimestamp: label,
      signaturePlacements: [
        ...(current.signaturePlacements || []).filter((placement) => placement.type !== datePlacementType),
        {
          id: `${datePlacementType}-${Date.now()}`,
          type: datePlacementType,
          x: clampPlacementPercent(x, 12, 88),
          y: clampPlacementPercent(y, 5, 95),
          label,
          image: '',
        },
      ],
    }))
    setIsDatePlacementMode(false)
    setStatus({ type: 'success', message: 'Date and time placed on document.' })
  }

  const removeSignaturePlacement = (id) => {
    setFormData((current) => ({
      ...current,
      signaturePlacements: (current.signaturePlacements || []).filter((placement) => placement.id !== id),
    }))
  }

  const updateSignatureField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
      signaturePlacements:
        field === 'signatureName'
          ? (current.signaturePlacements || []).map((placement) => (
              placement.type === 'client'
                ? { ...placement, label: value }
                : placement
            ))
          : current.signaturePlacements,
    }))
  }

  const startCompanySignature = (event) => {
    const canvas = companyCanvasRef.current
    if (!canvas) return

    const point = getCanvasPoint(canvas, event)
    const context = canvas.getContext('2d')
    context.beginPath()
    context.moveTo(point.x, point.y)
    setIsDrawingCompanySign(true)
  }

  const drawCompanySignature = (event) => {
    if (!isDrawingCompanySign) return
    const canvas = companyCanvasRef.current
    if (!canvas) return

    const point = getCanvasPoint(canvas, event)
    const context = canvas.getContext('2d')
    context.lineTo(point.x, point.y)
    context.stroke()
  }

  const stopCompanySignature = () => {
    setIsDrawingCompanySign(false)
  }

  const clearCompanySignature = () => {
    const canvas = companyCanvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    const scale = window.devicePixelRatio || 1
    context.clearRect(0, 0, canvas.width / scale, canvas.height / scale)
    setFormData((current) => ({
      ...current,
      [isFirstParty ? 'companySignatureData' : 'signatureData']: '',
    }))
  }

  const saveCompanySignature = () => {
    const canvas = companyCanvasRef.current
    if (!canvas) return

    setFormData((current) => ({
      ...current,
      [isFirstParty ? 'companySignatureData' : 'signatureData']: canvas.toDataURL('image/png'),
      contractTimestamp: new Date().toLocaleString(),
    }))
    setIsCompanyModalOpen(false)
    setIsPlacementMode(true)
    setStatus({ type: 'success', message: 'Signature saved. Double-click the document to place it.' })
  }

  const fetchCurrentDateTime = () => {
    setFormData((current) => ({
      ...current,
      contractDate: new Date().toISOString().slice(0, 10),
      contractTimestamp: new Date().toLocaleString(),
    }))
  }

  const saveDateTime = () => {
    setFormData((current) => ({
      ...current,
      contractTimestamp: current.contractTimestamp || new Date().toLocaleString(),
      contractDate: current.contractDate || new Date().toISOString().slice(0, 10),
    }))
    setIsDateModalOpen(false)
    setIsDatePlacementMode(true)
    setStatus({ type: 'success', message: 'Date and time saved. Triple-click the document to place it.' })
  }

  const submitSignedContract = async () => {
    if (!token || !contract) return

    const hasSignature = (formData.signaturePlacements || []).some((placement) => placement.type === signatureType)
    if ((!isFirstParty && !savedSignature) || !hasSignature) {
      setStatus({ type: 'error', message: isFirstParty ? 'Please place the first party signature field before sending.' : 'Please add and place your signature before submitting.' })
      return
    }

    setIsSubmittingSignature(true)
    setStatus({ type: '', message: '' })

    try {
      const data = await apiRequest(
        isFirstParty ? CONTRACT_ENDPOINTS.publicCompanySign(token) : CONTRACT_ENDPOINTS.publicSignDetail(token),
        {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
            companySignatureName: formData.companySignatureName || contract.senderName || 'Cromgen Technology',
            signatureName: formData.signatureName || contract.recipientName,
            signerEmail: formData.signerEmail || contract.recipientEmail,
          }),
        },
      )
      setContract(data.contract)
      setFormData((current) => ({ ...current, ...(data.contract || {}) }))
      setStatus({
        type: 'success',
        message: data.message || (isFirstParty ? 'First party submitted successfully.' : 'Contract submitted successfully.'),
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit contract.'
      const routeUnavailable = /backend route is not loaded/i.test(message)
      if (routeUnavailable) {
        setIsBackendRouteUnavailable(true)
      }

      setStatus({
        type: 'error',
        message,
      })
    } finally {
      setIsSubmittingSignature(false)
    }
  }

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    window.location.assign('/admin-dashboard')
  }

  const downloadSignedCopy = () => {
    if (!contract) return
    if (contract.signedContractFile?.data) {
      window.open(`${API_ENDPOINT}${CONTRACT_ENDPOINTS.publicSignedFile(token)}`, '_blank')
      return
    }

    const html = createSignedHtml(
      contract,
      formData,
      isOfficeDoc ? '' : fileUrl,
      docxHtml,
      formData.finalContractBody || contract.contractBody,
    )
    openPdfPrintWindow(html, contract.slug || 'signed-contract')
  }

  const filePath = token ? CONTRACT_ENDPOINTS.publicFile(token) : ''
  const fileUrl = filePath ? new URL(`${API_ENDPOINT}${filePath}`, window.location.origin).href : ''
  const fileType = contract?.contractFile?.type || ''
  const fileName = contract?.contractFile?.name || 'Contract document'
  const isPdf = fileType === 'application/pdf' || /\.pdf$/i.test(fileName)
  const isText = fileType === 'text/plain' || /\.txt$/i.test(fileName)
  const isOfficeDoc = /wordprocessingml|msword/i.test(fileType) || /\.(doc|docx)$/i.test(fileName)

  useEffect(() => {
    if (!token || !isOfficeDoc || !contract?.contractFile?.data) {
      return undefined
    }

    let isMounted = true
    fetch(`${API_ENDPOINT}${CONTRACT_ENDPOINTS.publicHtml(token)}`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to convert DOCX contract.')
        return response.text()
      })
      .then((html) => {
        if (isMounted) setDocxHtml(html)
      })
      .catch((error) => {
        if (!isMounted) return
        setStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'Unable to convert DOCX contract.',
        })
      })

    return () => {
      isMounted = false
    }
  }, [contract?.contractFile?.data, isOfficeDoc, token])

  return (
    <main className="contract-sign-page">
      <section className="contract-sign-shell">
        <div className="contract-sign-brand">
          <div className="contract-brand-block">
            <button type="button" className="contract-back-button" onClick={goBack}>
              Back
            </button>
          </div>

          <details className="contract-recipient-dropdown">
            <summary>
              <span>Recipient</span>
            </summary>
            <div>
              <strong>{contract?.recipientName || '-'}</strong>
              <p>{contract?.recipientEmail || '-'}</p>
              <span className={`admin-status-pill is-${contract?.status || 'pending'}`}>
                {contract?.status || 'pending'}
              </span>
            </div>
          </details>

        </div>

        <div className={`contract-status-slot ${status.message ? '' : 'is-empty'}`}>
          {status.message ? (
            <p className={`auth-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}>
              {status.message}
            </p>
          ) : null}
        </div>

        {contract ? (
          <div className="contract-sign-workspace">
            <article className="contract-document">
              <div className="contract-attachment-box">
                <div
                  className={`contract-preview-frame ${isPlacementMode || isDatePlacementMode ? 'is-placing' : ''}`}
                  onClick={addDatePlacement}
                  onDoubleClick={addSignaturePlacement}
                >
                  {contract.contractFile?.data ? (
                    isOfficeDoc ? (
                      <DocxHtmlPreview html={docxHtml} />
                    ) : isPdf || isText ? (
                      <iframe src={fileUrl} title="Contract file preview" />
                    ) : (
                      <div className="contract-file-placeholder">
                        <strong>{fileName}</strong>
                        <p>This file type can be opened separately. Place your signature on this signing sheet.</p>
                      </div>
                    )
                  ) : (
                    <ContractBodyPreview title={contract.title} body={formData.finalContractBody || contract.contractBody} />
                  )}
                  <div
                    className="contract-placement-layer"
                    aria-hidden="true"
                    onClick={addDatePlacement}
                    onDoubleClick={addSignaturePlacement}
                  >
                    {(formData.signaturePlacements || []).map((placement) => (
                      <span
                        key={placement.id}
                        className={`contract-placed-signature is-${placement.type} ${placement.type.endsWith('-date') ? 'is-date' : ''}`}
                        style={{ left: `${placement.x}%`, top: `${placement.y}%` }}
                        onClick={(event) => {
                          event.stopPropagation()
                          removeSignaturePlacement(placement.id)
                        }}
                      >
                        {placement.image ? <img src={placement.image} alt="" /> : <b>{placement.label}</b>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <aside className="contract-sign-form is-compact">
              {contract.status === 'signed' ? (
                <button type="button" onClick={downloadSignedCopy}>Download Signed Copy</button>
              ) : !canSecondPartySign ? (
                <div className="contract-waiting-box">
                  <span>Waiting</span>
                  <strong>Contract is being prepared</strong>
                  <p>The contract will be available for your signature after it is sent.</p>
                </div>
              ) : (
                <>
                  <h2>Sign Contract</h2>
                  <div className="contract-side-actions">
                    <button type="button" onClick={() => setIsDateModalOpen(true)}>
                      {formData.contractTimestamp || formData.contractDate || 'Date & Time'}
                    </button>
                    <button
                      type="button"
                      className={savedSignature ? 'is-signed' : ''}
                      onClick={() => setIsCompanyModalOpen(true)}
                    >
                      {savedSignature ? 'Signed' : 'Add Sign'}
                    </button>
                    <button
                      type="button"
                      onClick={submitSignedContract}
                      disabled={isSubmittingSignature || isBackendRouteUnavailable}
                    >
                      {isSubmittingSignature ? 'Submitting...' : isFirstParty ? 'Submit 1st Party' : 'Submit'}
                    </button>
                  </div>
                </>
              )}
            </aside>
          </div>
        ) : (
          <div className="admin-empty-state contract-loading-state">
            {status.type === 'error' ? 'Unable to open this contract.' : <span aria-label="Loading contract"></span>}
          </div>
        )}
      </section>

      {isCompanyModalOpen ? (
        <div className="contract-sign-modal" role="dialog" aria-modal="true" aria-labelledby="company-sign-title">
          <div className="contract-sign-modal-panel">
            <div className="contract-sign-modal-head">
              <div>
                <span>Signature</span>
                <h2 id="company-sign-title">{contract?.title || 'Contract'}</h2>
                <p>{formData.contractDate || new Date().toISOString().slice(0, 10)}</p>
              </div>
              <button type="button" onClick={() => setIsCompanyModalOpen(false)} aria-label="Close signature modal">
                Close
              </button>
            </div>

            <label className="contract-sign-modal-field">
              <span>Name</span>
              <input
                value={isFirstParty ? formData.companySignatureName : formData.signatureName}
                onChange={(event) => updateSignatureField(isFirstParty ? 'companySignatureName' : 'signatureName', event.target.value)}
              />
            </label>

            <canvas
              ref={companyCanvasRef}
              className="company-sign-canvas"
              onPointerDown={startCompanySignature}
              onPointerMove={drawCompanySignature}
              onPointerUp={stopCompanySignature}
              onPointerLeave={stopCompanySignature}
            />

            <div className="contract-sign-modal-actions">
              <button type="button" onClick={clearCompanySignature}>Clear</button>
              <button type="button" onClick={saveCompanySignature}>Save Signature</button>
            </div>
          </div>
        </div>
      ) : null}

      {isDateModalOpen ? (
        <div className="contract-sign-modal" role="dialog" aria-modal="true" aria-labelledby="date-time-title">
          <div className="contract-sign-modal-panel is-small">
            <div className="contract-sign-modal-head">
              <div>
                <span>Date & Time</span>
                <h2 id="date-time-title">Document timestamp</h2>
                <p>{formData.contractTimestamp || 'Not saved yet'}</p>
              </div>
              <button type="button" onClick={() => setIsDateModalOpen(false)} aria-label="Close date modal">
                Close
              </button>
            </div>

            <div className="contract-date-grid">
              <label className="contract-sign-modal-field">
                <span>Date</span>
                <input
                  type="date"
                  value={formData.contractDate}
                  onChange={(event) => updateSignatureField('contractDate', event.target.value)}
                />
              </label>
              <label className="contract-sign-modal-field">
                <span>Date & Time</span>
                <input
                  value={formData.contractTimestamp}
                  onChange={(event) => updateSignatureField('contractTimestamp', event.target.value)}
                />
              </label>
            </div>

            <div className="contract-sign-modal-actions">
              <button type="button" onClick={fetchCurrentDateTime}>Auto Fetch</button>
              <button type="button" onClick={saveDateTime}>Save Date Time</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

function getCanvasPoint(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

function clampPlacementPercent(value, min, max) {
  const number = Number(value)
  if (!Number.isFinite(number)) return min
  return Math.max(min, Math.min(max, number))
}

function openPdfPrintWindow(html, fileName) {
  const printWindow = window.open('', '_blank', 'width=900,height=1100')
  if (!printWindow) return

  const printableHtml = html.replace('</head>', `<title>${fileName}.pdf</title></head>`)
  printWindow.document.open()
  printWindow.document.write(`<!doctype html>${printableHtml}`)
  printWindow.document.close()

  const printWhenReady = () => {
    printWindow.focus()
    printWindow.print()
  }

  if (printWindow.document.readyState === 'complete') {
    window.setTimeout(printWhenReady, 250)
  } else {
    printWindow.addEventListener('load', () => window.setTimeout(printWhenReady, 250), { once: true })
  }
}

function createSignedHtml(contract, formData, fileUrl = '', docxHtml = '', contractBody = '') {
  const companySign = formData.companySignatureData || contract.companySignatureData
  const clientSign = formData.signatureUpload || formData.signatureData || contract.signatureUpload || contract.signatureData
  const placements = formData.signaturePlacements || contract.signaturePlacements || []
  const normalizedContractBody = String(contractBody || '').trim()
  const printableBody = docxHtml ? extractHtmlBody(docxHtml) : normalizedContractBody ? formatContractBodyHtml(normalizedContractBody) : ''
  const placementHtml = placements.map((placement) => `
    <div style="position:absolute;left:${placement.x}%;top:${placement.y}%;transform:translate(-50%,-50%);min-width:140px;text-align:center">
      ${placement.image ? `<img src="${placement.image}" style="max-width:160px;max-height:70px;display:block;margin:auto">` : `<strong style="font-family:'Brush Script MT','Segoe Script',cursive;font-size:24px">${escapeHtmlText(placement.label || '')}</strong>`}
      ${placement.label ? `<small style="display:block;color:#475467">${escapeHtmlText(placement.label)}</small>` : ''}
    </div>
  `).join('')

  return `
    <html>
      <head>
        <title>${contract.slug || 'signed-contract'}.pdf</title>
        <style>
          @page { size: A4; margin: 18mm; }
          * { box-sizing: border-box; }
          body { margin: 0; font-family: Arial, sans-serif; line-height: 1.65; color: #101828; }
          h1, h2, h3 { line-height: 1.25; }
          .print-head { margin-bottom: 18px; border-bottom: 1px solid #d0d5dd; padding-bottom: 14px; }
          .print-head h1 { margin: 0 0 8px; font-size: 24px; }
          .print-head p { margin: 2px 0; font-size: 12px; color: #475467; }
          .contract-print-body { position: relative; min-height: 920px; background: #fff; }
          .contract-print-body img { max-width: 100%; height: auto; }
          .contract-print-body table { width: 100%; border-collapse: collapse; }
          .contract-print-body td, .contract-print-body th { border: 1px solid #d0d5dd; padding: 8px; vertical-align: top; }
          .contract-print-overlay { position: absolute; inset: 0; pointer-events: none; }
          .signature-summary { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; break-inside: avoid; margin-top: 28px; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .contract-print-body { min-height: auto; }
          }
        </style>
      </head>
      <body>
        <div class="print-head">
          <h1>${escapeHtmlText(contract.title || 'Signed Contract')}</h1>
          <p><strong>Date:</strong> ${escapeHtmlText(formData.contractDate || contract.contractDate || '')}</p>
          <p><strong>Timestamp:</strong> ${escapeHtmlText(formData.contractTimestamp || contract.contractTimestamp || contract.signedAt || '')}</p>
        </div>
        <div class="contract-print-body">
          ${printableBody || (!docxHtml && fileUrl ? `<iframe src="${fileUrl}" style="width:100%;height:920px;border:0;background:#fff"></iframe>` : '')}
          <div class="contract-print-overlay">${placementHtml}</div>
        </div>
        <div class="signature-summary">
          <div><h3>1st Party Signature</h3>${companySign ? `<img src="${companySign}" style="max-width:260px">` : ''}<p>${formData.companySignatureName || contract.companySignatureName || ''}</p></div>
          <div><h3>2nd Party Signature</h3>${clientSign ? `<img src="${clientSign}" style="max-width:260px">` : ''}<p>${formData.signatureName || contract.signatureName || ''}</p></div>
        </div>
      </body>
    </html>
  `
}

function extractHtmlBody(value) {
  const html = String(value || '')
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return bodyMatch ? bodyMatch[1] : html
}

function ContractBodyPreview({ title, body }) {
  return (
    <iframe
      className="contract-docx-html-frame"
      srcDoc={createContractBodyHtml(title, body)}
      title="Contract description preview"
    />
  )
}

function createContractBodyHtml(title, body) {
  return `
    <!doctype html>
    <html>
      <head>
        <style>
          html,body{margin:0;min-height:100%;background:#f8fafc}
          body{font-family:Arial,sans-serif;color:#101828;line-height:1.65;padding:48px}
          main{max-width:820px;margin:auto;background:#fff;min-height:920px;padding:52px 58px;box-shadow:0 18px 50px rgba(15,23,42,.12)}
          h1{margin:0 0 26px;font-size:28px;line-height:1.2;color:#111827}
          p{margin:0 0 14px;font-size:15px}
          strong{font-weight:700}
          em{font-style:italic}
        </style>
      </head>
      <body>
        <main>
          <h1>${escapeHtmlText(title || 'Contract')}</h1>
          ${formatContractBodyHtml(body)}
        </main>
      </body>
    </html>
  `
}

function formatContractBodyHtml(value) {
  const lines = String(value || '').trim()
    ? String(value).split(/\r?\n/)
    : ['Contract description is not available.']

  return lines.map((rawLine) => {
    const line = rawLine.trim()
    if (!line) return '<p>&nbsp;</p>'
    const bullet = line.match(/^[-*]\s+(.+)$/)
    const numbered = line.match(/^\d+[.)]\s+(.+)$/)
    if (bullet) return `<p>&bull; ${formatInlineMarkup(bullet[1])}</p>`
    if (numbered) return `<p>${formatInlineMarkup(line)}</p>`
    return `<p>${formatInlineMarkup(line)}</p>`
  }).join('')
}

function formatInlineMarkup(value) {
  return escapeHtmlText(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

function escapeHtmlText(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function DocxHtmlPreview({ html }) {
  return (
    <iframe
      className="contract-docx-html-frame"
      srcDoc={html || createDocxLoadingHtml()}
      title="DOCX contract preview"
    />
  )
}

function createDocxLoadingHtml() {
  return `
    <!doctype html>
    <html>
      <head>
        <style>
          html,body{height:100%;margin:0;background:#fff}
          body{display:grid;place-items:center}
          span{width:36px;height:36px;border:3px solid rgba(70,95,255,.14);border-top-color:#465fff;border-radius:50%;animation:spin .8s linear infinite}
          @keyframes spin{to{transform:rotate(360deg)}}
        </style>
      </head>
      <body><span aria-label="Loading contract preview"></span></body>
    </html>
  `
}
