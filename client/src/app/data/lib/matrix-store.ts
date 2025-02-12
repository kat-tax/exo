import type {MatrixClient} from 'matrix-js-sdk/lib/client';
import type {MatrixEvent} from 'matrix-js-sdk/lib/models/event';
import type {Room} from 'matrix-js-sdk/lib/models/room';

export interface MatrixUser {
  id: string;
  name: string | null;
  avatar: string | null;
  typing: boolean;
  presence: string;
  lastActiveAgo: number;
  currentlyActive: boolean;
}

export interface MatrixRoom {
  id: string;
  name: string;
  avatar: string | null;
  members: Map<string, MatrixUser>;
  messages: MatrixMessage[];
}

export interface MatrixMessage {
  id: string;
  ts: number;
  type: string;
  self: boolean;
  sender: string;
  embed?: MatrixEmbed;
  body?: string;
}

export type MatrixEmbed =
  | MatrixFile
  | MatrixImage;

export interface MatrixFile {
  url: string;
  name: string;
  size: number;
  type?: string;
}

export interface MatrixImage extends MatrixFile {
  width: number;
  height: number;
  blurhash?: string;
  animated?: boolean;
}

export class MatrixStore {
  private rooms: Map<string, MatrixRoom> = new Map();
  private users: Map<string, MatrixUser> = new Map();
  private bc = new BroadcastChannel('matrix');

  constructor(
    private client: MatrixClient,
    private baseUrl: string,
    private userId: string,
  ) {
    this.baseUrl = baseUrl;
    this.userId = userId;
    this.rooms = new Map();
    this.users = new Map();
  }

  sync() {
    this.bc.postMessage({
      type: 'matrix::update',
      payload: {
        users: Array.from(this.users.values()),
        rooms: Array.from(this.rooms.values()),
      },
    });

  }

  addRoom(room: Room) {
    const _room: MatrixRoom = {
      id: room.roomId,
      name: room.name,
      avatar: room.getAvatarUrl(this.baseUrl, 128, 128, 'scale') || null,
      members: new Map(),
      messages: [],
    };
    
    // Cache room members
    for (const member of room.getJoinedMembers()) {
      const user: MatrixUser = {
        id: member.userId,
        name: member.name,
        avatar: member.getAvatarUrl(this.baseUrl, 128, 128, 'scale', true, false) || null,
        typing: member.typing,
        presence: member.user?.presence || '',
        lastActiveAgo: member.user?.getLastActiveTs() || 0,
        currentlyActive: false,
      };
      _room.members.set(member.userId, user);
      this.users.set(member.userId, user);
    }

    this.rooms.set(room.roomId, _room);
    this.sync();
  }

  addMessage(roomId: string, event: MatrixEvent) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const id = event.getId() ?? '';
    const ts = event.getTs();
    const sender = event.getSender() ?? '';
    const content = event.getContent();
    const type = content?.msgtype ?? 'm.text';
    const self = sender === this.userId;
  
    let body: string | undefined;
    let embed: MatrixEmbed | undefined;

    if (type === 'm.image') {
      embed = {
        url: this.client.mxcUrlToHttp(content.url) ?? '',
        name: content.body,
        type: content.info.mimetype,
        size: content.info.size,
        width: content.info.w,
        height: content.info.h,
        blurhash: content.info['xyz.amorgan.blurhash'],
        animated: content.info['org.matrix.msc4230.is_animated'],
      } satisfies MatrixImage;
    } else if (type === 'm.file') {
      embed = {
        url: this.client.mxcUrlToHttp(content.url) ?? '',
        name: content.body,
        size: content.info.size,
        type: content.info.mimetype,
      } satisfies MatrixFile;
    } else {
      body = content.body ?? undefined;
    }

    room.messages.push({id, ts, type, self, sender, embed, body});
    this.sync();
  }

  updateUser(userId: string, update: Partial<MatrixUser>) {
    const user = this.users.get(userId);
    if (!user) return;
    Object.assign(user, update);
    // Update user in all rooms they're a member of
    for (const room of this.rooms.values()) {
      if (room.members.has(userId)) {
        room.members.set(userId, user);
      }
    }
    this.sync();
  }

  clear() {
    this.rooms.clear();
    this.users.clear();
    this.bc.close();
    this.sync();
  }

  // Getters
  getRoom(roomId: string): MatrixRoom | undefined {
    return this.rooms.get(roomId);
  }

  getRooms(): MatrixRoom[] {
    return Array.from(this.rooms.values());
  }

  getUser(userId: string): MatrixUser | undefined {
    return this.users.get(userId);
  }

  getRoomMessages(roomId: string, limit = 50): MatrixMessage[] {
    const room = this.rooms.get(roomId);
    if (!room) return [];
    return room.messages.slice(-limit);
  }

  getRoomMembers(roomId: string): MatrixUser[] {
    const room = this.rooms.get(roomId);
    if (!room) return [];
    return Array.from(room.members.values());
  }
}
