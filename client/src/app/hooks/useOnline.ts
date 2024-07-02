import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useState, useEffect} from 'react';
import {isOnline, suscribeOnline} from 'react-exo/device';
import {toast} from 'react-exo/toast';

export function useOnline() {
  const [online, setOnline] = useState(false);
  const {i18n} = useLingui()

  const handleConnectivity = (connected: boolean, init?: boolean) => {
    if (connected && !init) {
      toast({title: t(i18n)`You are online`, preset: 'done'});
    } else if (!connected) {
      toast({title: t(i18n)`You are offline`, preset: 'error'});
    }
    setOnline(connected);
  }

  useEffect(() => {
    isOnline().then(connected => handleConnectivity(connected, true));
    return suscribeOnline(handleConnectivity);
  }, []);

  return online;
}
