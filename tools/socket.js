const cookie = require('cookie');

exports.connections = {};
exports.init = (app) => {
    app.locals.io.on('connection', (socket) => {
        const token = cookie.parse(socket.request.headers.cookie || '').token;
        if (!token) return;
        if (!this.connections[token]) this.connections[token] = [];
        this.connections[token].push(socket);

        socket.on('disconnect', () => {
            if (this.connections[token].length > 1) {
                // Remove the socket from the connections.
                const socketIndex = this.connections[token].indexOf(socket);
                this.connections[token] = this.connections[token].splice(socketIndex, 1);
            } else delete this.connections[token];
        })
    });
}