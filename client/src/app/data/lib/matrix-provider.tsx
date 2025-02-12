import {createContext, useContext, useState, useMemo, useEffect} from 'react';
import {useProfile} from 'app/data';

import type {MatrixRoom, MatrixUser} from './matrix-store';

interface MatrixContextType {
  rooms: MatrixRoom[];
  users: MatrixUser[];
}

interface ServiceWorkerMessage {
  type: string;
  payload?: any;
}

const MatrixContext = createContext<MatrixContextType | null>(null);

export function MatrixProvider({children}: React.PropsWithChildren) {
  const [rooms, setRooms] = useState<MatrixRoom[]>([]);
  const [users, setUsers] = useState<MatrixUser[]>([]);
  const value = useMemo(() => ({rooms, users}), [rooms, users]);
  const profile = useProfile();

  useEffect(() => {
    if (!profile?.matrixUserId || !profile?.matrixAccessToken) return;
    const bc = new BroadcastChannel('matrix');
    bc.onmessage = (event: MessageEvent<ServiceWorkerMessage>) => {
      const {type, payload} = event.data;
      if (type !== 'matrix::update') return;
      setRooms(payload.rooms);
      setUsers(payload.users);
    };
    if (profile?.matrixUserId && profile?.matrixAccessToken) {
      navigator.serviceWorker.controller?.postMessage({
        type: 'matrix::init',
        payload: {
          baseUrl: profile.matrixBaseUrl ?? 'https://matrix.org',
          userId: profile.matrixUserId,
          deviceId: profile.id,
          accessToken: profile.matrixAccessToken,
        },
      });
    }
    return () => {
      bc.close();
    };
  }, [
    profile?.id,
    profile?.matrixUserId,
    profile?.matrixBaseUrl,
    profile?.matrixAccessToken,
  ]);

  return (
    <MatrixContext.Provider value={value}>
      {children}
    </MatrixContext.Provider>
  );
}

export function useMatrix() {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrix must be used within a MatrixProvider');
  }
  return context;
}