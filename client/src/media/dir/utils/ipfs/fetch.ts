import {createVerifiedFetch} from '@helia/verified-fetch';
import {fileTypeFromBuffer} from 'file-type';

export const fetchIpfs = await createVerifiedFetch({
  gateways: ['https://dweb.link', 'https://trustless-gateway.link'],
  routers: ['http://delegated-ipfs.dev']
}, {
  contentTypeParser: async (bytes) => {
    const res = await fileTypeFromBuffer(bytes);
    return res?.mime;
  }
});
