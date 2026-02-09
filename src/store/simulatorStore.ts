import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrgConfig } from '../types/OrgConfig';
import { SimulatedUser } from '../types/User';
import { Network } from '../types/Network';
import { LogEvent } from '../types/LogEvent';

interface SimulatorStore {
  orgData: OrgConfig | null;
  users: SimulatedUser[] | null;
  infrastructure: Network[] | null;
  logsBySource: Record<string, LogEvent[]> | null;
  setOrgData: (data: OrgConfig) => void;
  setUsers: (data: SimulatedUser[]) => void;
  setInfrastructure: (data: Network[]) => void;
  setLogsBySource: (data: Record<string, LogEvent[]>) => void;
  reset: () => void;
}

export const useSimulatorStore = create<SimulatorStore>()(
  persist(
    (set) => ({
      orgData: null,
      users: null,
      infrastructure: null,
      logsBySource: null,
      setOrgData: (orgData) => set({ orgData }),
      setUsers: (users) => set({ users }),
      setInfrastructure: (infrastructure) => set({ infrastructure }),
      setLogsBySource: (logsBySource) => set({ logsBySource }),
      reset: () => set({ orgData: null, users: null, infrastructure: null, logsBySource: null }),
    }),
    {
      name: 'simulator-store',
    }
  )
);