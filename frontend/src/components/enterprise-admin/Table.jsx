import { ChevronDown, Download, Eye, FileDown, MoreHorizontal, Pencil, Search, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Modal } from './Modal.jsx'

export function EnterpriseTable({ title, rows, columns, onView, onEdit, onDelete, onDeleteSelected, rowActions = [], hideDefaultView = false, emptyText = 'No records found.' }) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(columns[0]?.key || 'id')
  const [page, setPage] = useState(1)
  const [openActionId, setOpenActionId] = useState('')
  const [filterKey, setFilterKey] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [confirmRequest, setConfirmRequest] = useState(null)
  const pageSize = 8
  const getRowKey = (row) => String(row.id || row.slug || row.email || row.name || row.title)
  const filterableColumns = useMemo(() => {
    const preferredKeys = ['status', 'category', 'service', 'role', 'department', 'type', 'priority', 'projectStatus', 'location']
    return columns.filter((column) => preferredKeys.includes(column.key))
  }, [columns])
  const filterOptions = useMemo(() => {
    if (!filterKey) return []

    return Array.from(new Set(rows.map((row) => String(row[filterKey] ?? '').trim()).filter(Boolean)))
      .sort((a, b) => a.localeCompare(b))
  }, [filterKey, rows])

  const filteredRows = useMemo(() => {
    const value = query.trim().toLowerCase()
    const searched = value
      ? rows.filter((row) => Object.values(row).some((item) => String(item ?? '').toLowerCase().includes(value)))
      : rows
    const visible = filterKey && filterValue
      ? searched.filter((row) => String(row[filterKey] ?? '') === filterValue)
      : searched

    return [...visible].sort((a, b) => String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? '')))
  }, [filterKey, filterValue, query, rows, sortKey])

  const pagedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const pagedRowIds = pagedRows.map(getRowKey)
  const selectedRows = filteredRows.filter((row) => selectedIds.includes(getRowKey(row)))
  const allPagedRowsSelected = pagedRowIds.length > 0 && pagedRowIds.every((id) => selectedIds.includes(id))

  useEffect(() => {
    setPage(1)
  }, [query, filterKey, filterValue])

  useEffect(() => {
    const availableIds = new Set(rows.map(getRowKey))
    setSelectedIds((current) => current.filter((id) => availableIds.has(id)))
  }, [rows])

  useEffect(() => {
    if (!filterKey && filterableColumns.length) {
      setFilterKey(filterableColumns[0].key)
    }
  }, [filterKey, filterableColumns])

  useEffect(() => {
    if (filterValue && !filterOptions.includes(filterValue)) {
      setFilterValue('')
    }
  }, [filterOptions, filterValue])

  const exportCsv = () => {
    const csvRows = [
      columns.map((column) => column.label),
      ...filteredRows.map((row) => columns.map((column) => `"${String(row[column.key] ?? '').replaceAll('"', '""')}"`)),
    ]
    const blob = new Blob([csvRows.map((line) => line.join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'records'}.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const toggleRowSelection = (row) => {
    const rowKey = getRowKey(row)
    setSelectedIds((current) => (
      current.includes(rowKey)
        ? current.filter((id) => id !== rowKey)
        : [...current, rowKey]
    ))
  }

  const togglePageSelection = () => {
    setSelectedIds((current) => {
      if (allPagedRowsSelected) {
        return current.filter((id) => !pagedRowIds.includes(id))
      }

      return Array.from(new Set([...current, ...pagedRowIds]))
    })
  }

  const deleteSelectedRows = async () => {
    if (!selectedRows.length) return
    setConfirmRequest({
      message: `Are you sure you want to delete ${selectedRows.length} selected record${selectedRows.length === 1 ? '' : 's'}?`,
      action: async () => {
        await onDeleteSelected?.(selectedRows)
        setSelectedIds([])
      },
    })
  }

  const confirmDelete = async () => {
    await confirmRequest?.action?.()
    setConfirmRequest(null)
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Live Records</p>
          <h2 className="mt-2 text-xl font-black text-white">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/30 px-3 text-sm text-slate-300">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search table" className="w-44 bg-transparent text-white outline-none placeholder:text-slate-500" />
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((open) => !open)}
              disabled={!filterableColumns.length}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-bold text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {filterValue ? `Filter: ${filterValue}` : 'Filter'} <ChevronDown size={15} />
            </button>
            {filterOpen ? (
              <div className="absolute right-0 top-12 z-30 w-72 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/30">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Field</span>
                  <select
                    value={filterKey}
                    onChange={(event) => {
                      setFilterKey(event.target.value)
                      setFilterValue('')
                    }}
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm font-bold text-white outline-none"
                  >
                    {filterableColumns.map((column) => (
                      <option key={column.key} value={column.key}>{column.label}</option>
                    ))}
                  </select>
                </label>
                <label className="mt-3 block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Value</span>
                  <select
                    value={filterValue}
                    onChange={(event) => {
                      setFilterValue(event.target.value)
                      setFilterOpen(false)
                    }}
                    className="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 text-sm font-bold text-white outline-none"
                  >
                    <option value="">All records</option>
                    {filterOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                {filterValue ? (
                  <button
                    type="button"
                    onClick={() => {
                      setFilterValue('')
                      setFilterOpen(false)
                    }}
                    className="mt-3 w-full rounded-xl bg-white/10 px-3 py-2 text-sm font-black text-white hover:bg-white/15"
                  >
                    Clear Filter
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
          <button type="button" onClick={exportCsv} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-bold text-white hover:bg-white/15">
            <Download size={15} /> CSV
          </button>
          <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-bold text-white hover:bg-white/15">
            <FileDown size={15} /> PDF
          </button>
          {onDeleteSelected ? (
            <button
              type="button"
              onClick={deleteSelectedRows}
              disabled={!selectedRows.length}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-rose-400/10 px-3 text-sm font-bold text-rose-100 hover:bg-rose-400/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 size={15} /> Delete Selected {selectedRows.length ? `(${selectedRows.length})` : ''}
            </button>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-separate border-spacing-y-2">
          <thead>
            <tr>
              {onDeleteSelected ? (
                <th className="px-3 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={allPagedRowsSelected}
                    onChange={togglePageSelection}
                    className="h-4 w-4 rounded border-white/20 bg-slate-950/40 accent-cyan-300"
                    aria-label="Select visible rows"
                  />
                </th>
              ) : null}
              {columns.map((column) => (
                <th key={column.key} className="px-3 py-2 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  <button type="button" onClick={() => setSortKey(column.key)} className="hover:text-cyan-200">{column.label}</button>
                </th>
              ))}
              <th className="px-3 py-2 text-right text-xs font-black uppercase tracking-[0.2em] text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.length ? pagedRows.map((row) => (
              <tr key={getRowKey(row)} className="group">
                {onDeleteSelected ? (
                  <td className="rounded-l-2xl bg-slate-950/35 px-3 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(getRowKey(row))}
                      onChange={() => toggleRowSelection(row)}
                      className="h-4 w-4 rounded border-white/20 bg-slate-950/40 accent-cyan-300"
                      aria-label={`Select ${row.name || row.title || row.email || 'row'}`}
                    />
                  </td>
                ) : null}
                {columns.map((column, index) => (
                  <td key={column.key} className={`${index === 0 && !onDeleteSelected ? 'rounded-l-2xl' : ''} bg-slate-950/35 px-3 py-4 text-sm ${index === 0 ? 'font-black text-cyan-100' : 'font-semibold text-slate-200'}`}>
                    {column.type === 'status' ? (
                      <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-black text-cyan-100">{row[column.key] || '-'}</span>
                    ) : column.type === 'progress' ? (
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" style={{ width: `${Number(row[column.key] || 0)}%` }}></div>
                        </div>
                        <span className="text-xs font-black text-slate-300">{row[column.key] || 0}%</span>
                      </div>
                    ) : column.type === 'link' && row[column.key] ? (
                      <a href={row[column.key]} target="_blank" rel="noreferrer" className="font-black text-cyan-200 underline-offset-4 hover:underline">
                        Open
                      </a>
                    ) : (
                      row[column.key] || '-'
                    )}
                  </td>
                ))}
                <td className="rounded-r-2xl bg-slate-950/35 px-3 py-4 text-right">
                  <div className="relative flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenActionId((current) => (current === (row.id || row.slug || row.email || row.name) ? '' : (row.id || row.slug || row.email || row.name)))}
                      className="rounded-xl p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                      aria-label="Open actions"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {openActionId === (row.id || row.slug || row.email || row.name) ? (
                      <div className="absolute right-0 top-10 z-20 w-44 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-left shadow-2xl shadow-black/30">
                        {!hideDefaultView ? (
                          <button type="button" onClick={() => { setOpenActionId(''); onView?.(row) }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-200 hover:bg-white/10">
                            <Eye size={15} /> View
                          </button>
                        ) : null}
                        {onEdit ? (
                          <button type="button" onClick={() => { setOpenActionId(''); onEdit(row) }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-200 hover:bg-white/10">
                            <Pencil size={15} /> Edit
                          </button>
                        ) : null}
                        {rowActions.map((action) => {
                          if (action.hidden?.(row)) return null
                          const Icon = action.icon || MoreHorizontal
                          return (
                            <button
                              key={action.label}
                              type="button"
                              onClick={() => {
                                setOpenActionId('')
                                action.onClick?.(row)
                              }}
                              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold hover:bg-white/10 ${action.tone === 'danger' ? 'text-rose-200 hover:bg-rose-400/10' : 'text-slate-200'}`}
                            >
                              <Icon size={15} /> {action.label}
                            </button>
                          )
                        })}
                        {onDelete ? (
                          <button type="button" onClick={() => { setOpenActionId(''); setConfirmRequest({ message: 'Are you sure you want to delete this record?', action: () => onDelete(row) }) }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-rose-200 hover:bg-rose-400/10">
                            <Trash2 size={15} /> Delete
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 1 + (onDeleteSelected ? 1 : 0)} className="rounded-2xl bg-slate-950/35 px-4 py-10 text-center text-sm font-semibold text-slate-400">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <span>Showing {pagedRows.length} of {filteredRows.length}</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-xl bg-white/10 px-3 py-2 font-bold text-white disabled:opacity-40" disabled={page === 1}>Prev</button>
          <span>Page {page} / {totalPages}</span>
          <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="rounded-xl bg-white/10 px-3 py-2 font-bold text-white disabled:opacity-40" disabled={page === totalPages}>Next</button>
        </div>
      </div>
      <Modal open={Boolean(confirmRequest)} title="Are you sure?" onClose={() => setConfirmRequest(null)}>
        <div className="space-y-5">
          <p className="text-sm font-semibold leading-6 text-slate-300">{confirmRequest?.message}</p>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setConfirmRequest(null)} className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white hover:bg-white/15">
              No
            </button>
            <button type="button" onClick={confirmDelete} className="rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-500 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20">
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
