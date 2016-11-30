const WebSocketServer = require('ws').Server,
      wss = new WebSocketServer({port: 8181});

const fs = require('fs');

var chunks;

wss.on('connection', (ws) => {
  chunks = [];
  console.log('client connected');
  ws.on('message', (message) => {
    console.log('message:', message);
    
    // When the Client sends a message 'EOF', it means the upload has been completed,  save chunks to a file.
    if (message === "EOF") {
      fs.writeFileSync('a.webm', Buffer.concat(chunks));
      chunks = [];
      ws.send('DONE');
    } else {
      // Suppose the chunk sent by a browser returned from the MediaRecorder API.
      chunks.push(message);
      ws.send(message);
    }
  });
});
