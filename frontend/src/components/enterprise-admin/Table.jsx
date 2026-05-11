import { ChevronDown, Download, FileDown, MoreHorizontal, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

export function EnterpriseTable({ title, rows }) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState('id')
  const [page, setPage] = useState(1)
  const pageSize = 4

  const filteredRows = useMemo(() => {
    const value = query.trim().toLowerCase()
    const visible = value
      ? rows.filter((row) => Object.values(row).some((item) => String(item).toLowerCase().includes(value)))
      : rows

    return [...visible].sort((a, b) => String(a[sortKey]).localeCompare(String(b[sortKey])))
  }, [query, rows, sortKey])

  const pagedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Operations Table</p>
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
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-bold text-white hover:bg-white/15">
            <Download size={15} /> CSV
          </button>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-sm font-bold text-white hover:bg-white/15">
            <FileDown size={15} /> PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-separate border-spacing-y-2">
          <thead>
            <tr>
              {[
                ['id', 'Project ID'],
                ['name', 'Name'],
                ['owner', 'Owner'],
                ['status', 'Status'],
                ['priority', 'Priority'],
                ['progress', 'Progress'],
                ['budget', 'Budget'],
              ].map(([key, label]) => (
                <th key={key} className="px-3 py-2 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  <button type="button" onClick={() => setSortKey(key)} className="hover:text-cyan-200">{label}</button>
                </th>
              ))}
              <th className="px-3 py-2 text-right text-xs font-black uppercase tracking-[0.2em] text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row) => (
              <tr key={row.id} className="group">
                <td className="rounded-l-2xl bg-slate-950/35 px-3 py-4 text-sm font-black text-cyan-100">{row.id}</td>
                <td className="bg-slate-950/35 px-3 py-4 text-sm font-bold text-white">{row.name}</td>
                <td className="bg-slate-950/35 px-3 py-4 text-sm text-slate-300">{row.owner}</td>
                <td className="bg-slate-950/35 px-3 py-4">
                  <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-black text-cyan-100">{row.status}</span>
                </td>
                <td className="bg-slate-950/35 px-3 py-4 text-sm font-bold text-white">{row.priority}</td>
                <td className="bg-slate-950/35 px-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" style={{ width: `${row.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-black text-slate-300">{row.progress}%</span>
                  </div>
                </td>
                <td className="bg-slate-950/35 px-3 py-4 text-sm font-bold text-white">{row.budget}</td>
                <td className="rounded-r-2xl bg-slate-950/35 px-3 py-4 text-right">
                  <button type="button" className="rounded-xl p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Open actions">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
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
