import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly JWT_SECRET = 'verysecret';

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token;
      const decoded = jwt.verify(token, this.JWT_SECRET) as jwt.JwtPayload;
      if (decoded && decoded.userId) {
        client.join(decoded.userId);
        console.log(
          `Client ${client.id} connected and identified as user ${decoded.userId}`,
        );
      } else {
        client.disconnect();
        console.log(
          `Failed to identify or authenticate user for client ${client.id}`,
        );
      }
    } catch (error) {
      console.log(
        `Authentication error for client ${client.id}: ${error.message}`,
      );
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifyUser(userId: string, event: string, message: any) {
    this.server.to(userId).emit(event, message);
  }

  notifyUsers(userIds: string[], event: string, message: any): void {
    userIds.forEach((userId) => {
      this.server.to(userId).emit(event, message);
    });
  }
}
