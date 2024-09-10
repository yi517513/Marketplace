import io from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(url, userId) {
    this.socket = io(url, { query: { userId } });
  }

  onMessage(callback) {
    if (this.socket) {
      this.socket.on("message", (message) => {
        callback(message);
      });
    } else {
      console.error("Socket is not connected.");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    } else {
      console.error("Socket is not connected.");
    }
  }
}

const socketService = new SocketService();
export default socketService;
