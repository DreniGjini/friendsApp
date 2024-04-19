import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
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
  private readonly JWT_SECRET = 'verysecret'; // Secret key for JWT

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token;
      const decoded = jwt.verify(token, this.JWT_SECRET) as jwt.JwtPayload;
      if (decoded && decoded.userId) {
        client.join(decoded.userId); // Use the userId as a room identifier
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
      client.disconnect(); // Disconnect on failed authentication
    }
  }

  @SubscribeMessage('identify')
  handleIdentify(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ): void {
    // This method might not be necessary if you're authenticating with JWT
    console.log(`Client ${client.id} re-identified as user ${data.userId}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Send notifications to a specific user by emitting to their room
  notifyUser(userId: string, event: string, message: any) {
    this.server.to(userId).emit(event, message);
  }
}
