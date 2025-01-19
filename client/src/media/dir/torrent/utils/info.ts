import {isUint8Array, uint8ArrayToHex, uint8ArrayToString} from 'uint8array-extras';
import {decode} from './bencode';

import type {TorrentInfo, TorrentFileData} from '../types';

/**
 * Data about the files the torrent contains
 */
export function files(file: Uint8Array): TorrentFileData {
  const torrent: any = decode(file);
  const result: TorrentFileData = {
    files: [],
    length: 0,
    lastPieceLength: 0,
    pieceLength: torrent?.info?.['piece length'] ?? 0,
    pieces: [],
  };

  if (!torrent?.info) return result;

  const files: string[] = torrent.info.files || [torrent.info];
  const name: string = (torrent.info['name.utf-8'] || torrent.info.name).toString();
  result.files = files.map((file: any, i) => {
    const parts: string[] = [name, ...(file['path.utf-8'] || file.path || [])].map(p =>
      p.toString(),
    );
    return {
      path: parts.slice(1).join('/'),
      name: parts[parts.length - 1],
      length: file.length,
      offset: files.slice(0, i).reduce(sumLength, 0),
    };
  });

  result.length = files.reduce(sumLength, 0);

  const lastFile = result.files[result.files.length - 1];

  result.lastPieceLength =
    (lastFile && (lastFile.offset + lastFile.length) % result.pieceLength) || result.pieceLength;
  result.pieces = splitPieces(torrent.info.pieces);
  return result;
}

function sumLength(sum: number, file: string): number {
  return sum + file.length;
}

function splitPieces(buf: Uint8Array): string[] {
  const pieces: string[] = [];
  for (let i = 0; i < buf.length; i += 20) {
    pieces.push(uint8ArrayToHex(buf.slice(i, i + 20)));
  }

  return pieces;
}

/**
 * Torrent file info
 */
export function info(file: Uint8Array): TorrentInfo {
  const torrent: any = decode(file);

  if (!torrent?.info) return {
    name: '',
    announce: [],
    comment: '',
    private: false,
    created: new Date(),
    createdBy: '',
    urlList: [],
  };

  const result: TorrentInfo = {
    name: (torrent?.info['name.utf-8'] || torrent.info.name).toString(),
    announce: [],
    urlList: [],
  };

  if (torrent.info.private !== undefined) {
    result.private = Boolean(torrent.info.private);
  }

  if (torrent['creation date']) {
    result.created = new Date(torrent['creation date'] * 1000);
  }

  if (torrent['created by']) {
    result.createdBy = torrent['created by'].toString();
  }

  if (isUint8Array(torrent.comment)) {
    result.comment = uint8ArrayToString(torrent.comment);
  }

  // announce and announce-list will be missing if metadata fetched via ut_metadata
  if (
    Array.isArray(torrent['announce-list']) &&
    torrent['announce-list'] &&
    torrent['announce-list'].length > 0
  ) {
    for (const urls of torrent['announce-list']) {
      for (const url of urls) {
        result.announce.push(url.toString());
      }
    }
  } else if (torrent.announce) {
    result.announce.push(torrent.announce.toString());
  }

  if (result.announce.length) {
    result.announce = Array.from(new Set(result.announce));
  }

  // web seeds
  if (isUint8Array(torrent['url-list'])) {
    // some clients set url-list to empty string
    torrent['url-list'] = torrent['url-list'].length > 0 ? [torrent['url-list']] : [];
  }

  result.urlList = (torrent['url-list'] || []).map((url: any) => url.toString());
  if (result.urlList.length) {
    result.urlList = Array.from(new Set(result.urlList));
  }

  return result;
}
