import {createVerifiedFetch} from '@helia/verified-fetch';
import {fileTypeFromBuffer} from 'file-type';

export async function pin(_path: string, _name: string) {
  //const buffer = await web.getFileBuffer(path);
  //const file = new File([buffer], name);
  //return `${location.origin}/ipfs/${IpfsHash}/${name}`;
  return 'https://dweb.link/ipfs/QmS4ustL5ZRg3QjZbs31VHa9n9Jxhcpnwtnc5BAJXsm4S';
}

export const fetchIpfs = await createVerifiedFetch({
  gateways: ['https://dweb.link', 'https://trustless-gateway.link'],
  routers: ['http://delegated-ipfs.dev']
}, {
  contentTypeParser: async (bytes) => {
    const res = await fileTypeFromBuffer(bytes);
    return res?.mime;
  }
});
