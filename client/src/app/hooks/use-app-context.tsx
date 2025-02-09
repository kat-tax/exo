import {useOutletContext} from 'react-exo/navigation';

import type {useDeviceSession} from 'app/hooks/use-device-session';
import type {useProfile} from 'app/data';

export type AppContext = ReturnType<typeof useAppContext>;

export function useAppContext() {
  return useOutletContext<{
    device: ReturnType<typeof useDeviceSession>,
    profile: ReturnType<typeof useProfile>,
    layout: {hasPreviewPanel: boolean},
  }>() || {};
}
