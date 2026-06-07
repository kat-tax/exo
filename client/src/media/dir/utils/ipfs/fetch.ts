import type {VerifiedFetch} from '@helia/verified-fetch';

let _fetch: VerifiedFetch | null = null;

const init = async (): Promise<{fetch: (src: string) => Promise<Response>}> => {
  // Load needed dependencies on demand for first ipfs fetch
  if (!_fetch) {
    const [{createVerifiedFetch}, {fileTypeFromBuffer}] = await Promise.all([
      import('@helia/verified-fetch'),
      import('file-type')
    ]);
    _fetch = await createVerifiedFetch({
      gateways: ['https://dweb.link', 'https://trustless-gateway.link'],
      routers: ['http://delegated-ipfs.dev']
    }, {
      contentTypeParser: async (bytes) => {
        const res = await fileTypeFromBuffer(bytes);
        return res?.mime;
      }
    });
  }

  return {
    fetch: (src: string) => {
      if (!_fetch) throw new Error('IPFS fetch not initialized');
      // Strip filename from path if exists
      // (e.g., ipfs://<cid>/file.png -> ipfs://<cid>)
      const cleanPath = (src.match(/\//g) || []).length >= 3
        ? src.substring(0, src.lastIndexOf('/'))
        : src;
      return _fetch(cleanPath);
    }
  };
};

export const IPFS = {init};
