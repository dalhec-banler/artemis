export type Role = 'mobile' | 'agent' | 'dev' | 'personal';

export interface Moon {
  who: string;
  nam: string;
  rol: Role;
  pub: string;
  sec: string;
  lif: string;
  rif: string;
  sed: string;
  dat: number;
  tag: string[];
}

export const ROLE_META: Record<Role, { label: string; color: string; icon: string }> = {
  mobile: {
    label: 'Mobile',
    color: 'text-role-mobile bg-role-mobile/10 border-role-mobile/30',
    icon: 'M10 1a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-4Zm2 15a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  },
  agent: {
    label: 'AI Agent',
    color: 'text-role-agent bg-role-agent/10 border-role-agent/30',
    icon: 'M12 2a3 3 0 0 0-3 3v1H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1v2l3-2h4l3 2v-2h1a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-3-3Zm-2 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
  },
  dev: {
    label: 'Dev',
    color: 'text-role-dev bg-role-dev/10 border-role-dev/30',
    icon: 'M9.4 3.6 1 12l8.4 8.4 1.4-1.4L3.8 12l7-7-1.4-1.4Zm5.2 0-1.4 1.4 7 7-7 7 1.4 1.4L23 12l-8.4-8.4Z',
  },
  personal: {
    label: 'Personal',
    color: 'text-role-personal bg-role-personal/10 border-role-personal/30',
    icon: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-7 8a7 7 0 0 1 14 0H5Z',
  },
};

declare global {
  interface Window {
    ship: string;
    desk: string;
  }
}
