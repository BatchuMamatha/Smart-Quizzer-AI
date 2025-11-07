import { io, Socket } from 'socket.io-client';

// Use environment variable or fallback to localhost
const SOCKET_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private currentRoom: string | null = null;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize WebSocket connection
   */
  private initialize(): void {
    if (this.socket) {
      console.log('🔌 Socket already initialized');
      return;
    }

    console.log(`🔌 Connecting to WebSocket server: ${SOCKET_URL}`);

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
      auth: {
        token: sessionStorage.getItem('access_token')
      }
    });

    // Connection established
    this.socket.on('connect', () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('✅ WebSocket connected:', this.socket?.id);
    });

    // Connection error
    this.socket.on('connect_error', (error) => {
      console.error('❌ WebSocket connection error:', error.message);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('🚫 Max reconnection attempts reached. Please refresh the page.');
      }
    });

    // Connection established (server confirmation)
    this.socket.on('connection_established', (data) => {
      console.log('✅ Server confirmed connection:', data);
    });

    // Disconnection
    this.socket.on('disconnect', (reason) => {
      this.isConnected = false;
      console.log('🔌 WebSocket disconnected:', reason);
    });

    // Reconnection attempt
    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`🔄 Reconnection attempt #${attemptNumber}`);
    });

    // Reconnection success
    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`✅ Reconnected after ${attemptNumber} attempts`);
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // Rejoin room if we were in one
      if (this.currentRoom) {
        this.joinLeaderboardRoom(this.currentRoom);
      }
    });
  }

  /**
   * Join a leaderboard room for real-time updates
   * @param topic - The quiz topic (e.g., "Mathematics", "Science")
   */
  public joinLeaderboardRoom(topic: string): void {
    if (!this.socket || !this.isConnected) {
      console.warn('⚠️  Cannot join room - socket not connected');
      this.initialize(); // Try to reconnect
      return;
    }

    console.log(`🚪 Joining leaderboard room: ${topic}`);
    
    this.socket.emit('join_leaderboard', { topic });
    this.currentRoom = topic;

    // Listen for confirmation
    this.socket.once('joined_leaderboard', (data) => {
      console.log('✅ Joined leaderboard room:', data);
    });
  }

  /**
   * Leave the current leaderboard room
   * @param topic - The quiz topic to leave
   */
  public leaveLeaderboardRoom(topic: string): void {
    if (!this.socket || !this.isConnected) {
      console.warn('⚠️  Cannot leave room - socket not connected');
      return;
    }

    console.log(`🚪 Leaving leaderboard room: ${topic}`);
    
    this.socket.emit('leave_leaderboard', { topic });
    this.currentRoom = null;

    // Listen for confirmation
    this.socket.once('left_leaderboard', (data) => {
      console.log('✅ Left leaderboard room:', data);
    });
  }

  /**
   * Listen for leaderboard updates
   * @param callback - Function to call when leaderboard updates
   */
  public onLeaderboardUpdate(callback: (data: any) => void): void {
    if (!this.socket) {
      console.warn('⚠️  Cannot listen for updates - socket not initialized');
      return;
    }

    console.log('👂 Listening for user leaderboard updates...');
    // User-facing leaderboard updates are emitted as 'leaderboard:user_update'
    // Remove any existing listener first to avoid duplicates
    this.socket.off('leaderboard:user_update');
    
    this.socket.on('leaderboard:user_update', (data) => {
      console.log('📊 User leaderboard update received:', data);
      callback(data);
    });
  }

  /**
   * Remove leaderboard update listener
   */
  public offLeaderboardUpdate(): void {
    if (!this.socket) {
      return;
    }

    console.log('🔇 Removing user leaderboard update listener');
    this.socket.off('leaderboard:user_update');
  }

  /**
   * Listen for admin leaderboard updates (admin UI)
   */
  public onAdminLeaderboardUpdate(callback: (data: any) => void): void {
    if (!this.socket) {
      console.warn('⚠️  Cannot listen for admin updates - socket not initialized');
      return;
    }
    console.log('👂 Listening for admin leaderboard updates...');
    // Remove any existing listener first to avoid duplicates
    this.socket.off('leaderboard:admin_update');
    
    this.socket.on('leaderboard:admin_update', (data) => {
      console.log('📊 Admin leaderboard update received:', data);
      callback(data);
    });
  }

  /**
   * Remove admin leaderboard update listener
   */
  public offAdminLeaderboardUpdate(): void {
    if (!this.socket) return;
    console.log('🔇 Removing admin leaderboard update listener');
    this.socket.off('leaderboard:admin_update');
  }

  /**
   * Check if socket is connected
   */
  public getConnectionStatus(): boolean {
    return this.isConnected && this.socket !== null && this.socket.connected;
  }

  /**
   * Get the socket instance (for advanced usage)
   */
  public getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Disconnect the socket
   */
  public disconnect(): void {
    if (this.socket) {
      console.log('🔌 Disconnecting WebSocket...');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.currentRoom = null;
    }
  }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;
