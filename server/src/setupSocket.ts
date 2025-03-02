import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

export default function setupSocket(server: HttpServer) {
    const io = new SocketServer(server, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:3000"],
        },
    });
    io.listen(4000);

    io.on("connection", (socket) => {
        console.log("a user connected, socket.id: " + socket.id);
        io.to(socket.id).emit("hello");
        socket.on("disconnect", () => {
            console.log("a user disconnected, socket.id: " + socket.id);
        });
    });
    return io;
}
