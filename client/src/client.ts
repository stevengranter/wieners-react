import { io, Socket } from "socket.io-client";

type Client = { socket: Socket | null };

const URL =
    process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

const Client: Client = { socket: null };
Client.socket = io(URL, { autoConnect: false });

export default Client;
