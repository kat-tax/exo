import {useOutletContext} from 'react-exo/navigation';

import type {useDeviceSession} from 'app/hooks/useDeviceSession';
import type {useDeviceFileSystem} from 'app/hooks/useDeviceFileSystem';
import type {useProfile} from 'app/data';

export type AppContext = ReturnType<typeof useAppContext>;

export function useAppContext() {
  return useOutletContext<{
    filesystem: ReturnType<typeof useDeviceFileSystem>,
    device: ReturnType<typeof useDeviceSession>,
    profile: ReturnType<typeof useProfile>,
    layout: {hasPreviewPanel: boolean},
  }>() || {};
}
