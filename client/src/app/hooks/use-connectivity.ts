import {useLingui} from '@lingui/react/macro';
import {useState, useEffect} from 'react';
import {isOnline, suscribeOnline} from 'react-exo/device';
import {toast} from 'react-exo/toast';

export function useConnectivity() {
  const [online, setOnline] = useState(false);
  const {t} = useLingui();

  useEffect(() => {
    const handleConnectivity = (connected: boolean, init?: boolean) => {
      if (connected && !init) {
        toast({title: t`You are online`, preset: 'done'});
      } else if (!connected) {
        toast({title: t`You are offline`, preset: 'error'});
      }
      setOnline(connected);
    };
    isOnline().then(connected =>
      handleConnectivity(connected, true));
    return suscribeOnline(handleConnectivity);
  }, [t]);

  return online;
}
