import {setFocus} from '@noriginmedia/norigin-spatial-navigation';
import {useState, useCallback, useMemo, useEffect} from 'react';
import {useSet, useGet, useQueries} from 'app/data';
import {getPathById, getPathList} from 'app/data/queries';
import {useNav} from 'app/nav/hooks';
import {PathId} from 'app/data/types';
import {isZeego} from 'app/ui/float';
import {getData} from 'media/file/utils/data';
import {saveAs} from 'media/dir/utils/hfs/fs';
import {device} from 'app/data/lib/device';
import media from 'media/store';

import type {GestureResponderEvent} from 'react-native';
import type {DirEvoluCtx, DirEvoluEntry} from 'media/dir/types/evolu';
import type {DeviceId} from 'app/data/types';

export function useDirEvolu(pathId: PathId | null, deviceId: DeviceId, tmp?: boolean): Omit<DirEvoluCtx, 'bar'> {
  const set = useSet();
  const nav = useNav();
  const sel = useGet(media.selectors.getSelected);
  const ext = useMemo(() => ({sel, tmp}), [sel, tmp]);
  const [list, setList] = useState<DirEvoluEntry[]>([]);
  const [[path], data] = useQueries([
    getPathById(deviceId, pathId),
    getPathList(deviceId, pathId),
  ]);

  const goUp = useCallback(() => {
    if (!path) {
      nav.push('MediaBrowseDevices');
      setFocus(`device-${device.id}`);
      return false;
    }
    const pathId = path.parentId ?? undefined;
    nav.push('MediaBrowseEvolu', {pathId, deviceId});
    setFocus('list-0');
    return true;
  }, [path, nav, deviceId]);

  const open = useCallback(async (entry: DirEvoluEntry, clearSel?: boolean) => {
    if (!entry.isDirectory) return;
    nav.push('MediaBrowseEvolu', {pathId: entry.id, deviceId});
    setFocus('list-0');
    if (clearSel) set(media.actions.selectBulk([]));
  }, [nav, set, deviceId]);

  const select = useCallback((entry: DirEvoluEntry, event?: GestureResponderEvent) => {
    if (isZeego(event)) return;
    const [isShift, isCtrl] = [event?.shiftKey, event?.metaKey || event?.ctrlKey];
    const isSelected = sel?.includes(`evolu://${deviceId}/${entry.id}`);
    if (isShift && entry.isDirectory && (isSelected || sel?.length === 0)) {
      return open(entry);
    }
    set(media.actions.selectItem({
      path: `evolu://${deviceId}/${entry.id}`,
      isRange: isShift ?? false,
      isMulti: isCtrl ?? false,
      list: list.map(e => `evolu://${deviceId}/${e.id}`),
    }));
  }, [sel, deviceId, list, open, set]);

  const download = useCallback(async (entry: DirEvoluEntry) => {
    if (entry.isFile) {
      const uri = path
        ? `evolu://${deviceId}/${path}/${entry.name}`
        : `evolu://${deviceId}/${entry.name}`;
      saveAs(await getData(uri, 'dataUrl'), entry.name);
    }
  }, [path, deviceId]);

  // Update list with query results
  useEffect(() => {
    // Empty results
    if (!data?.length) {
      setList([]);
      return;
    }
    // Map evolu data to entry objects
    const entries = data.map(e => ({
      id: e.id,
      name: e.name ?? '',
      size: e.size ?? 0,
      thumb: e.thumb,
      updatedAt: new Date(e.updatedAt),
      createdAt: new Date(e.createdAt),
      isDirectory: e.fileId === null,
      isFile: e.fileId !== null,
    }));
    setList(entries);
  }, [data]);

  return {
    ext,
    dir: {
      list,
      path,
      deviceId,
    },
    cmd: {
      goUp,
      open,
      select,
      download,
    },
  };
}
