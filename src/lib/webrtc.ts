export interface SignalingMessage {
  type: 'offer' | 'answer' | 'candidate' | 'join-room' | 'leave-room' | 'chat-message';
  roomId: string;
  senderId: string;
  payload: any;
}

export class WebRTCStreamEngine {
  private static instance: WebRTCStreamEngine;
  private activeRooms: Map<string, Set<string>> = new Map();

  public static getInstance(): WebRTCStreamEngine {
    if (!WebRTCStreamEngine.instance) {
      WebRTCStreamEngine.instance = new WebRTCStreamEngine();
    }
    return WebRTCStreamEngine.instance;
  }

  public joinRoom(roomId: string, socketId: string): void {
    if (!this.activeRooms.has(roomId)) {
      this.activeRooms.set(roomId, new Set());
    }
    this.activeRooms.get(roomId)?.add(socketId);
  }

  public leaveRoom(roomId: string, socketId: string): void {
    if (this.activeRooms.has(roomId)) {
      this.activeRooms.get(roomId)?.delete(socketId);
      if (this.activeRooms.get(roomId)?.size === 0) {
        this.activeRooms.delete(roomId);
      }
    }
  }

  public getViewerCount(roomId: string): number {
    return this.activeRooms.get(roomId)?.size || 0;
  }
}
