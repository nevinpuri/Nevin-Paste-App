var fs = require("fs");
var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("server listening on port 3000");
});

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("someone connected");

  socket.on("client send new paste", (data) => {
    console.log(data);
  });

  socket.on("client request paste", (data) => {
    fs.readFile(data, "UTF-8", (err, data) => {
      if (err) throw err;

      var content = data;
      console.log(context);
    });
  });
});
