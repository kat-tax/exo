import {useState, useEffect} from 'react';
import {fetchIPFS} from 'media/utils/ipfs';

export function useRemoteType(cid?: string) {
  const [data, setData] = useState<string>('');
  
  useEffect(() => {
    if (!cid) return;
    (async () => {
      const response = await fetchIPFS(`ipfs://${cid}`);
      const type = response.headers.get('content-type');
      if (!type) return;
      setData(type);
    })();
  }, [cid]);

  return data;
}
