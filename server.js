const WebSocketServer = require('ws').Server,
      wss = new WebSocketServer({port: 8181});

wss.on('connection', (ws) => {
  console.log('client connected');
  ws.on('message', (message) => {
    console.log('message:', message);
    ws.send("You've sent : " +  message);
  });
  ws.send('something');
});
