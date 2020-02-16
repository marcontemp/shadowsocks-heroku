const net = require('net');
const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('asdf.');
});
const wss = new WebSocketServer({ server });
wss.on('connection', function(ws) {
    console.log('server connected');
    console.log('concurrent connections:', wss.clients.size);
    ws.on('message', function(data, flags) {
        console.log('[msg] %s', data);
    });
    ws.on('ping', () => ws.pong('', null, true));

    ws.on('close', function() {
        console.log('server disconnected');
        console.log('concurrent connections:', wss.clients.size);
    });

    ws.on('error', function(e) {
        console.warn(`server: ${e}`);
        console.log('concurrent connections:', wss.clients.size);
    });
});
server.listen('8080', '192.168.0.109', function() {
    const address = server.address();
    console.log('server listening at', address);
});

server.on('error', function(e) {
    if (e.code === 'EADDRINUSE') {
        console.log('address in use, aborting');
    }
    process.exit(1);
});