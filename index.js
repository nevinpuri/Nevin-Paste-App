var fs = require("fs");
var express = require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var chalk = require("chalk");
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("server listening on port 3000");
});

app.use(express.static(path.join(__dirname, "public")));

fs.stat(__dirname + "/pastes/", (err) => {
  if (err)
    fs.mkdir(__dirname + "/pastes", (err) => {
      if (err) throw err;
      console.log(chalk.yellow("pastes directory didn't exist. Created one"));
    });
});

io.on("connection", (socket) => {
  console.log(chalk.blue("someone connected"));

  socket.on("client send new paste", (data) => createPaste(data));

  socket.on("client request paste", (data) => requestPaste(data));

  const createPaste = (data) => {
    var fileContext = data;
    if (fileContext.length > 10000) {
      socket.emit("server reject file: over 10k chars");
      console.log(chalk.red("File was rejected: Over 10k chars"));
    } else {
      fs.writeFile(
        __dirname + "/pastes/" + generateRandomString(8) + ".txt",
        fileContext,
        (err) => {
          if (err) throw err;
          console.log(chalk.green("Paste was successfully created"));
        }
      );
    }
  };

  const requestPaste = (data) => {
    var fileName = data;
    fs.readFile(
      __dirname + "/pastes/" + fileName + ".txt",
      "UTF-8",
      (err, data) => {
        if (err) {
          console.log(chalk.red(`Error: Unable to get paste ${fileName}.txt`));
          socket.emit("server reject request: Unable to get paste");
        } else {
          socket.emit("server send paste data", data);
        }
      }
    );
  };

  var generateRandomString = (length) => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }; // make sure its UTF-8
});
