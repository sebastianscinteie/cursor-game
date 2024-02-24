import { type UUID, randomUUID } from "crypto";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 9000 });
interface Users {
  [index: UUID]: {
    username?: string;
    online: boolean;
    state?: {
      X: number;
      Y: number;
    };
  };
}
const users: Users = {};

function broadcast(wss: WebSocketServer): void {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(users));
  });
}

wss.on("connection", (ws, req) => {
  ws.on("error", console.error);

  const uuid = randomUUID();
  console.log(uuid);
  const un = new URL(
    req.url as string,
    `http://${req.headers.host}`,
  ).searchParams.get("username");

  users[uuid] = {
    username: un as string,
    online: true,
    state: {
      X: 0,
      Y: 0,
    },
  };
  const user = users[uuid];

  ws.on("message", (data) => {
    console.log("received: %s", data);
  });

  ws.on("close", () => {
    if (user !== undefined) {
      user.online = false;
    }
    broadcast(wss);
  });

  broadcast(wss);
});
