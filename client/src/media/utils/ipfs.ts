import {createVerifiedFetch} from '@helia/verified-fetch';
import {fileTypeFromBuffer} from 'file-type';
import {PinataSDK} from 'pinata';
import {web} from 'react-exo/fs';

const GATEWAY = 'crimson-ready-wildfowl-264.mypinata.cloud';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMDhjMmJiZi1lZjAyLTRhN2MtOGQwNC03NTU0YWJjZjkyYjEiLCJlbWFpbCI6ImFkbWluQGthdC50YXgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYjNlZmY1NWZmYzU4MzliMjNjYTIiLCJzY29wZWRLZXlTZWNyZXQiOiI5ZTkwM2QyYzE1YmM5MWI5MGY4NjZiYzhmMDAzMGU5YjllY2ZkNTkxMGMyZjEzMmY3OTQxYTNkNjIxNzc0ZWVlIiwiZXhwIjoxNzU1NDIyMjMwfQ.LU50gEV74UNY74WLuIaG_NCRsDbx-iR7IH8gCm3CScE';

const pinata = new PinataSDK({
  pinataGateway: GATEWAY,
  pinataJwt: JWT_TOKEN,
});

export async function pin(path: string, name: string) {
  const buffer = await web.getFileBuffer(path);
  const file = new File([buffer], name);
  const ext = name.split('.').pop();
  const {IpfsHash} = await pinata.upload.file(file);
  return `${location.origin}/${IpfsHash}/${ext}`;
}

export const fetchIPFS = await createVerifiedFetch({
  gateways: ['https://dweb.link', 'https://trustless-gateway.link'],
  routers: ['http://delegated-ipfs.dev']
}, {
  contentTypeParser: async (bytes) => {
    const res = await fileTypeFromBuffer(bytes);
    return res?.mime;
  }
});
