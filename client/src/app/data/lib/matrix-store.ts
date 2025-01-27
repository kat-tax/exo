import {MatrixEvent} from 'matrix-js-sdk/lib/models/event';
import {Room} from 'matrix-js-sdk/lib/models/room';

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
  type: string;
  sender: string;
  isSelf: boolean;
  content: any;
  timestamp: number;
}

export class MatrixStore {
  private baseUrl: string;
  private userId: string;
  private rooms: Map<string, MatrixRoom> = new Map();
  private users: Map<string, MatrixUser> = new Map();
  private bc = new BroadcastChannel('matrix');

  constructor(baseUrl: string, userId: string) {
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
    room.getJoinedMembers().forEach(member => {
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
    });

    this.rooms.set(room.roomId, _room);
    this.sync();
  }

  addMessage(roomId: string, event: MatrixEvent) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const _message: MatrixMessage = {
      id: event.getId()!,
      type: event.getType(),
      sender: event.getSender()!,
      content: event.getContent(),
      timestamp: event.getTs(),
      isSelf: event.getSender() === this.userId,
    };

    room.messages.push(_message);
    this.sync();
    console.log('>> Adding message to room', roomId, _message);
  }

  updateUser(userId: string, update: Partial<MatrixUser>) {
    const user = this.users.get(userId);
    if (!user) return;
    Object.assign(user, update);
    // Update user in all rooms they're a member of
    this.rooms.forEach(room => {
      if (room.members.has(userId)) {
        room.members.set(userId, user);
      }
    });
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
