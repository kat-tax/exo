import {useOutletContext} from 'react-exo/navigation';

import type {useDevice} from 'app/hooks/use-device';
import type {useProfile} from 'app/data';

export type AppCtx = ReturnType<typeof useApp>;

export function useApp() {
  return useOutletContext<{
    layout: {hasPreviewPanel: boolean},
    device: ReturnType<typeof useDevice>,
    profile: ReturnType<typeof useProfile>,
  }>() || {};
}
