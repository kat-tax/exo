import * as sdk from 'matrix-js-sdk';
import {MatrixStore} from './matrix-store';

const DEBUG = false;

export let client: sdk.MatrixClient;
export let store: MatrixStore;

export type MatrixOptions = {
  baseUrl: string;
  userId: string;
  deviceId: string;
  accessToken: string;
};

export async function init(options: MatrixOptions) {
  if (store) {
    store.sync();
    return;
  }
  const {baseUrl, userId, deviceId, accessToken} = options;
  client = sdk.createClient({baseUrl, userId, deviceId, accessToken});
  client.startClient({lazyLoadMembers: false});
  store = new MatrixStore(client, baseUrl, userId);
  populate(store);
  subscribe(store);
}

export function populate(store: MatrixStore) {
  const rooms = client.getRooms();
  for (const room of rooms) {
    store.addRoom(room);
  }
}

export function subscribe(store: MatrixStore) {
  /* User events */

  client.on(sdk.UserEvent.Presence, (event, user) => {
    DEBUG && console.log('>> [matrix] [UserEvent.Presence]', event, user);
    store.updateUser(user.userId, {presence: user.presence});
  });

  client.on(sdk.UserEvent.LastPresenceTs, (event, user) => {
    DEBUG && console.log('>> [matrix] [UserEvent.LastPresenceTs]', event, user);
    store.updateUser(user.userId, {lastActiveAgo: user.getLastActiveTs()});
  });

  client.on(sdk.UserEvent.DisplayName, (event, user) => {
    DEBUG && console.log('>> [matrix] [UserEvent.DisplayName]', event, user);
    store.updateUser(user.userId, {name: user.displayName});
  });

  client.on(sdk.UserEvent.AvatarUrl, (event, user) => {
    DEBUG && console.log('>> [matrix] [UserEvent.AvatarUrl]', event, user);
    store.updateUser(user.userId, {avatar: user.avatarUrl});
  });

  client.on(sdk.UserEvent.CurrentlyActive, (event, user) => {
    DEBUG && console.log('>> [matrix] [UserEvent.CurrentlyActive]', event, user);
    store.updateUser(user.userId, {currentlyActive: user.currentlyActive});
  });

  /* Room events */

  client.on(sdk.RoomEvent.Name, (room) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.Name]', room);
    store.addRoom(room);
  });
  client.on(sdk.RoomEvent.Tags, (event, room) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.Tags]', event, room);
  });
  client.on(sdk.RoomEvent.Receipt, (event, room) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.Receipt]', event, room);
  });
  client.on(sdk.RoomEvent.Redaction, (event, room, threadId) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.Redaction]', event, room, threadId);
  });
  client.on(sdk.RoomEvent.RedactionCancelled, (event, room) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.RedactionCancelled]', event, room);
  });
  client.on(sdk.RoomEvent.AccountData, (event, room) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.AccountData]', event, room);
  });
  client.on(sdk.RoomEvent.MyMembership, (room, membership, oldMembership) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.MyMembership]', room, membership, oldMembership);
    if (membership === 'join')
      store.addRoom(room);
  });
  client.on(sdk.RoomEvent.LocalEchoUpdated, (event, room, oldEventId, oldStatus) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.LocalEchoUpdated]', event, room, oldEventId, oldStatus);
  });
  client.on(sdk.RoomEvent.HistoryImportedWithinTimeline, (markerEvent, room) => {
    DEBUG && console.log('>> [matrix] [RoomEvent.HistoryImportedWithinTimeline]', markerEvent, room);
  });
  client.on(sdk.RoomEvent.Timeline, (event, room, toStartOfTimeline) => {
    if (room &&event?.getType() === 'm.room.message') {
      store.addMessage(room.roomId, event);
    }
    DEBUG && console.log('>> [matrix] [RoomEvent.Timeline]', room?.name, event, toStartOfTimeline);
  });

  return () => {
    client.removeAllListeners();
    client.stopClient();
  };
}
