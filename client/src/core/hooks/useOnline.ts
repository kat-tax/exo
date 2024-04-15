import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useState, useEffect} from 'react';
import {isOnline, suscribeOnline} from 'react-exo/device';
import {toast} from 'react-exo/toast';

export function useOnline() {
  const [online, setOnline] = useState(true);

  const handleConnectivity = (connected: boolean) => {
    if (connected && !online) {
      toast({title: t`You are online`, preset: 'done'});
    } else if (!connected && online) {
      toast({title: t`You are offline`, preset: 'error'});
    }
    setOnline(connected);
  };

  useLingui();
  useEffect(() => {
    isOnline().then(handleConnectivity);
    return suscribeOnline(handleConnectivity);
  }, []);

  return online;
}
