import { ChevronDown, Download, FileDown, MoreHorizontal, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

export function EnterpriseTable({ title, rows, columns, onDelete, emptyText = 'No records found.' }) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(columns[0]?.key || 'id')
  const [page, setPage] = useState(1)
  const pageSize = 8

  const filteredRows = useMemo(() => {
    const value = query.trim().toLowerCase()
    const visible = value
      ? rows.filter((row) => Object.values(row).some((item) => String(item ?? '').toLowerCase().includes(value)))
      : rows

    return [...visible].sort((a, b) => String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? '')))
  }, [query, rows, sortKey])

  const pagedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))

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
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-bold text-white hover:bg-white/15">
            Filter <ChevronDown size={15} />
          </button>
          <button type="button" onClick={exportCsv} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-bold text-white hover:bg-white/15">
            <Download size={15} /> CSV
          </button>
          <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-bold text-white hover:bg-white/15">
            <FileDown size={15} /> PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-separate border-spacing-y-2">
          <thead>
            <tr>
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
              <tr key={row.id || row.slug || row.email || row.name} className="group">
                {columns.map((column, index) => (
                  <td key={column.key} className={`${index === 0 ? 'rounded-l-2xl' : ''} bg-slate-950/35 px-3 py-4 text-sm ${index === 0 ? 'font-black text-cyan-100' : 'font-semibold text-slate-200'}`}>
                    {column.type === 'status' ? (
                      <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-black text-cyan-100">{row[column.key] || '-'}</span>
                    ) : column.type === 'progress' ? (
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" style={{ width: `${Number(row[column.key] || 0)}%` }}></div>
                        </div>
                        <span className="text-xs font-black text-slate-300">{row[column.key] || 0}%</span>
                      </div>
                    ) : (
                      row[column.key] || '-'
                    )}
                  </td>
                ))}
                <td className="rounded-r-2xl bg-slate-950/35 px-3 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {onDelete ? (
                      <button type="button" onClick={() => onDelete(row)} className="rounded-xl p-2 text-rose-200 hover:bg-rose-400/10" aria-label="Delete record">
                        <Trash2 size={18} />
                      </button>
                    ) : null}
                    <button type="button" className="rounded-xl p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Open actions">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 1} className="rounded-2xl bg-slate-950/35 px-4 py-10 text-center text-sm font-semibold text-slate-400">
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
    </section>
  )
}
