import { useState, type KeyboardEvent } from 'react';
import type { Moon, Role } from '../types';
import { ROLE_META } from '../types';
import { RoleBadge } from './RoleBadge';
import { ConfirmDialog } from './ConfirmDialog';
import {
  rekeyMoon,
  breachMoon,
  forgetMoon,
  nameMoon,
  setRole,
  addTag,
  delTag,
} from '../api';

interface MoonCardProps {
  moon: Moon;
}

export function MoonCard({ moon }: MoonCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(moon.nam);
  const [tagInput, setTagInput] = useState('');
  const [confirm, setConfirm] = useState<{
    title: string;
    message: string;
    label: string;
    action: () => void;
  } | null>(null);

  const ROLE_COLORS: Record<Role, string> = {
    mobile: '#3fb950',
    agent: '#bc8cff',
    dev: '#d29922',
    personal: '#58a6ff',
  };

  function downloadKey() {
    const patp = moon.who.slice(1);
    const blob = new Blob([moon.sed], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patp}.key`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleSaveName() {
    if (editName.trim() && editName !== moon.nam) {
      nameMoon(moon.who, editName.trim());
    }
    setEditing(false);
  }

  function handleTagKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && tagInput.trim()) {
      addTag(moon.who, tagInput.trim());
      setTagInput('');
    }
  }

  function handleRoleChange(rol: Role) {
    setRole(moon.who, rol);
  }

  return (
    <>
      <div
        className={`group relative bg-surface-1 border rounded-xl transition-all duration-200 ${
          expanded
            ? 'border-line shadow-lg shadow-black/20'
            : 'border-transparent hover:border-line/50 hover:shadow-md hover:shadow-black/10'
        }`}
      >
        {/* role accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ backgroundColor: ROLE_COLORS[moon.rol], opacity: 0.3 }}
        />

        {/* header — always visible */}
        <div
          className="flex items-center gap-4 p-4 cursor-pointer select-none"
          onClick={() => setExpanded(!expanded)}
        >
          {/* moon phase icon */}
          <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-surface-2 border border-line/50 flex items-center justify-center overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lunar-100/30 to-transparent" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-l from-surface-2 to-transparent w-1/2 ml-auto" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              {moon.nam ? (
                <span className="font-semibold text-lunar-50 truncate">
                  {moon.nam}
                </span>
              ) : null}
              <span className="font-mono text-sm text-lunar-200 truncate">
                {moon.who}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <RoleBadge role={moon.rol} />
              {moon.tag.map((t) => (
                <span
                  key={t}
                  className="text-xs text-lunar-300 bg-surface-2 px-2 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* date */}
          <span className="hidden sm:block text-xs text-lunar-300 flex-shrink-0">
            {new Date(moon.dat * 1000).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>

          {/* chevron */}
          <svg
            className={`w-4 h-4 text-lunar-300 transition-transform duration-200 flex-shrink-0 ${
              expanded ? 'rotate-180' : ''
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* expanded panel */}
        {expanded && (
          <div className="border-t border-line px-4 pb-4">
            {/* actions row */}
            <div className="flex flex-wrap gap-2 pt-4 pb-3">
              <button
                onClick={downloadKey}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-lunar-100 bg-surface-2 hover:bg-surface-3 border border-line rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Key
              </button>
              <button
                onClick={() =>
                  setConfirm({
                    title: 'Cycle Keys',
                    message: `Generate new keys for ${moon.nam || moon.who}? The old keys will be invalidated. The moon must be rebooted with the new keyfile.`,
                    label: 'Cycle Keys',
                    action: () => rekeyMoon(moon.who),
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-lunar-100 bg-surface-2 hover:bg-surface-3 border border-line rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Cycle Keys
              </button>
              <button
                onClick={() =>
                  setConfirm({
                    title: 'Breach Moon',
                    message: `Breach ${moon.nam || moon.who}? This increments the rift and resets the moon's state. This cannot be undone.`,
                    label: 'Breach',
                    action: () => breachMoon(moon.who),
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-danger/80 bg-danger/5 hover:bg-danger/10 border border-danger/20 rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Breach
              </button>
              <button
                onClick={() =>
                  setConfirm({
                    title: 'Forget Moon',
                    message: `Remove ${moon.nam || moon.who} from Artemis? The moon's keys and seed will be lost. Make sure you've downloaded the keyfile first.`,
                    label: 'Forget',
                    action: () => forgetMoon(moon.who),
                  })
                }
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-danger/80 bg-danger/5 hover:bg-danger/10 border border-danger/20 rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Forget
              </button>
            </div>

            {/* details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {/* name */}
              <div className="bg-surface-0 rounded-lg p-3 border border-line/50">
                <label className="text-xs text-lunar-300 uppercase tracking-wider mb-1 block">
                  Name
                </label>
                {editing ? (
                  <div className="flex gap-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      autoFocus
                      className="flex-1 bg-surface-2 text-lunar-50 px-2 py-1 rounded border border-line text-sm font-mono"
                    />
                    <button
                      onClick={handleSaveName}
                      className="text-xs text-role-mobile hover:text-role-mobile/80"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-lunar-50 cursor-pointer hover:text-role-personal transition-colors"
                    onClick={() => {
                      setEditName(moon.nam);
                      setEditing(true);
                    }}
                  >
                    {moon.nam || 'Click to name...'}
                  </div>
                )}
              </div>

              {/* role */}
              <div className="bg-surface-0 rounded-lg p-3 border border-line/50">
                <label className="text-xs text-lunar-300 uppercase tracking-wider mb-1 block">
                  Role
                </label>
                <select
                  value={moon.rol}
                  onChange={(e) => handleRoleChange(e.target.value as Role)}
                  className="bg-surface-2 text-lunar-50 px-2 py-1 rounded border border-line text-sm w-full cursor-pointer"
                >
                  <option value="mobile">Mobile</option>
                  <option value="agent">AI Agent</option>
                  <option value="dev">Dev</option>
                  <option value="personal">Personal</option>
                </select>
              </div>

              {/* life & rift */}
              <div className="bg-surface-0 rounded-lg p-3 border border-line/50">
                <label className="text-xs text-lunar-300 uppercase tracking-wider mb-1 block">
                  Life / Rift
                </label>
                <span className="font-mono text-lunar-100">
                  {moon.lif} / {moon.rif}
                </span>
              </div>

              {/* created */}
              <div className="bg-surface-0 rounded-lg p-3 border border-line/50">
                <label className="text-xs text-lunar-300 uppercase tracking-wider mb-1 block">
                  Created
                </label>
                <span className="text-lunar-100">
                  {new Date(moon.dat * 1000).toLocaleString('en-US')}
                </span>
              </div>
            </div>

            {/* tags */}
            <div className="mt-3 bg-surface-0 rounded-lg p-3 border border-line/50">
              <label className="text-xs text-lunar-300 uppercase tracking-wider mb-2 block">
                Tags
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {moon.tag.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 text-xs text-lunar-100 bg-surface-2 px-2.5 py-1 rounded-full border border-line/50"
                  >
                    {t}
                    <button
                      onClick={() => delTag(moon.who, t)}
                      className="text-lunar-300 hover:text-danger transition-colors ml-0.5"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKey}
                  placeholder="add tag..."
                  className="bg-transparent text-xs text-lunar-100 placeholder:text-lunar-300/50 w-24 px-1 py-1"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title ?? ''}
        message={confirm?.message ?? ''}
        confirmLabel={confirm?.label}
        danger
        onConfirm={() => {
          confirm?.action();
          setConfirm(null);
        }}
        onCancel={() => setConfirm(null)}
      />
    </>
  );
}
