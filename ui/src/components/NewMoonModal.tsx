import { useState } from 'react';
import type { Role } from '../types';
import { ROLE_META } from '../types';
import { makeMoon } from '../api';

interface NewMoonModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewMoonModal({ open, onClose }: NewMoonModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('personal');

  if (!open) return null;

  function handleCreate() {
    makeMoon(name.trim(), role);
    setName('');
    setRole('personal');
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-1 border border-line rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl">
        {/* crescent accent */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-lunar-50/20 to-transparent blur-xl" />

        <h2 className="text-xl font-semibold text-lunar-50 mb-1">Launch New Moon</h2>
        <p className="text-sm text-lunar-300 mb-6">
          A new moon will be spawned from ~{window.ship} with fresh keys.
        </p>

        {/* name input */}
        <div className="mb-4">
          <label className="text-xs text-lunar-300 uppercase tracking-wider mb-1.5 block">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Phone, Code Agent, Test Moon..."
            className="w-full bg-surface-0 border border-line rounded-lg px-4 py-3 text-lunar-50 placeholder:text-lunar-300/40 focus:border-lunar-200/30 transition-colors"
            autoFocus
          />
        </div>

        {/* role selector */}
        <div className="mb-6">
          <label className="text-xs text-lunar-300 uppercase tracking-wider mb-2 block">
            Role
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(ROLE_META) as Role[]).map((r) => {
              const meta = ROLE_META[r];
              const selected = role === r;
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    selected
                      ? `${meta.color} border-current`
                      : 'border-line/50 text-lunar-200 hover:border-line hover:text-lunar-100 bg-surface-0'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d={meta.icon} />
                  </svg>
                  <div>
                    <div className="text-sm font-medium">{meta.label}</div>
                    <div className="text-xs opacity-60">
                      {r === 'mobile' && 'Phone / tablet'}
                      {r === 'agent' && 'Autonomous AI'}
                      {r === 'dev' && 'Development'}
                      {r === 'personal' && 'For a person'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-lunar-200 hover:text-lunar-50 bg-surface-2 hover:bg-surface-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-2.5 text-sm font-semibold text-void bg-lunar-50 hover:bg-white rounded-lg transition-colors"
          >
            Launch
          </button>
        </div>
      </div>
    </div>
  );
}
