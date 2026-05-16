import type { Role } from '../types';
import { ROLE_META } from '../types';

export function RoleBadge({ role }: { role: Role }) {
  const meta = ROLE_META[role];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${meta.color}`}
    >
      <svg
        className="w-3 h-3"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d={meta.icon} />
      </svg>
      {meta.label}
    </span>
  );
}
