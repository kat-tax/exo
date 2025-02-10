import {useOutletContext} from 'react-exo/navigation';

import type {useProfile} from 'app/data';
import type {useSession} from 'app/hooks/use-session';

export type AppCtx = ReturnType<typeof useApp>;

export function useApp() {
  return useOutletContext<{
    layout: {hasPreviewPanel: boolean},
    device: ReturnType<typeof useSession>,
    profile: ReturnType<typeof useProfile>,
  }>() || {};
}
