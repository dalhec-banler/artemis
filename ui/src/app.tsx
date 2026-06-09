import { useEffect, useRef, useState, useMemo } from 'react';
import type { Moon, Role } from './types';
import { ROLE_META } from './types';
import urb from './api';
import { MoonCard } from './components/MoonCard';
import { NewMoonModal } from './components/NewMoonModal';

type Filter = Role | 'all';

export function App() {
  const [moons, setMoons] = useState<Moon[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [newestWho, setNewestWho] = useState<string | null>(null);
  const subRef = useRef<number>(0);
  const knownRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    urb
      .subscribe({
        app: 'artemis',
        path: '/moons',
        event: (update: { moons: Moon[] }) => {
          const incoming = new Set(update.moons.map((m) => m.who));
          for (const who of incoming) {
            if (!knownRef.current.has(who)) {
              setNewestWho(who);
            }
          }
          knownRef.current = incoming;
          setMoons(update.moons);
        },
        quit: () => console.warn('artemis subscription quit'),
        err: () => console.error('artemis subscription error'),
      })
      .then((id) => {
        subRef.current = id;
      });

    const cleanup = () => {
      if (subRef.current) {
        urb.unsubscribe(subRef.current);
      }
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };
  }, []);

  const filtered = useMemo(() => {
    let list = moons;
    if (filter !== 'all') {
      list = list.filter((m) => m.rol === filter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.who.toLowerCase().includes(q) ||
          m.nam.toLowerCase().includes(q) ||
          m.tag.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [moons, filter, search]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: moons.length };
    for (const m of moons) {
      c[m.rol] = (c[m.rol] || 0) + 1;
    }
    return c;
  }, [moons]);

  return (
    <div className="min-h-screen bg-void relative overflow-hidden">
      {/* background — subtle star field */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-role-agent/3 blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-role-personal/3 blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* artemis crescent logo */}
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lunar-50 to-lunar-100/60" />
                <div className="absolute top-0.5 left-2 w-7 h-8 rounded-full bg-void" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-lunar-50 tracking-tight">
                  artemis
                </h1>
                <p className="text-xs text-lunar-300 font-mono">
                  ~{window.ship}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowNew(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-void bg-lunar-50 hover:bg-white rounded-lg transition-colors shadow-lg shadow-lunar-50/10"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Moon
            </button>
          </div>

          {/* filter bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-1 bg-surface-1 rounded-lg p-1 border border-line/50">
              {(['all', 'mobile', 'agent', 'dev', 'personal'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    filter === f
                      ? 'bg-surface-3 text-lunar-50'
                      : 'text-lunar-300 hover:text-lunar-100'
                  }`}
                >
                  {f === 'all' ? 'All' : ROLE_META[f].label}
                  {counts[f] ? (
                    <span className="ml-1.5 text-lunar-300/60">
                      {counts[f]}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lunar-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search moons..."
                className="w-full bg-surface-1 border border-line/50 rounded-lg pl-10 pr-4 py-2 text-sm text-lunar-50 placeholder:text-lunar-300/40 focus:border-lunar-200/30 transition-colors"
              />
            </div>
          </div>
        </header>

        {/* moon grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative w-20 h-20 mb-6 opacity-30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lunar-100 to-lunar-200/40" />
              <div className="absolute top-1 left-5 w-14 h-18 rounded-full bg-void" />
            </div>
            <p className="text-lunar-300 text-sm mb-1">
              {moons.length === 0
                ? 'No moons yet'
                : 'No moons match your filter'}
            </p>
            {moons.length === 0 && (
              <p className="text-lunar-300/60 text-xs">
                Launch your first moon to get started
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((moon) => (
              <MoonCard key={moon.who} moon={moon} autoExpand={moon.who === newestWho} />
            ))}
          </div>
        )}

        {/* fleet summary */}
        {moons.length > 0 && (
          <footer className="mt-8 pt-4 border-t border-line/30 flex justify-between text-xs text-lunar-300/60">
            <span>{moons.length} moon{moons.length !== 1 ? 's' : ''} in fleet</span>
            <span>artemis v1.0.0</span>
          </footer>
        )}
      </div>

      <NewMoonModal open={showNew} onClose={() => setShowNew(false)} />
    </div>
  );
}
