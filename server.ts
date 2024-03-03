import { type RawData, type WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 9000 });
interface Users {
  [username: string]: {
    online: boolean;
    state?: {
      X: number;
      Y: number;
    };
    webSocket: WebSocket | null;
  };
}
const users: Users = {};

function broadcast(wss: WebSocketServer, message: string): void {
  wss.clients.forEach((client) => {
    client.send(message);
  });
}

wss.on("connection", (ws, req) => {
  ws.on("error", console.error);

  const username = new URL(
    req.url as string,
    `http://${req.headers.host}`,
  ).searchParams.get("username") as string;

  const user = users[username];
  if (user !== undefined) {
    if (user?.webSocket !== null) {
      user.webSocket = ws;
    } else {
      console.error("User %s already connected.", username);
    }
  } else {
    users[username] = {
      online: true,
      state: {
        X: 0,
        Y: 0,
      },
      webSocket: ws,
    };
  }

  ws.on("message", (data: RawData) => {
    console.log("received: %s", data);
    const textMessage = data.toLocaleString();
    if (textMessage[0] === "@") {
      const userToWhisper = textMessage
        .split(" ", 1)[0]
        ?.substring(1) as string;
      users[userToWhisper]?.webSocket?.send(textMessage);
    } else {
      broadcast(wss, textMessage);
    }
  });

  ws.on("close", () => {
    if (user !== undefined) {
      user.online = false;
    }
    broadcast(wss, JSON.stringify(users));
  });

  broadcast(wss, JSON.stringify(users));
});
