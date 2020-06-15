$(function () {
  var socket = io();

  var pasteStatus = false;

  var $createPaste = document.getElementById("createPasteButton");
  var $userInput = document.getElementById("userInput");
  var $footer = document.getElementById("footer");
  var $urlString = window.location.href;
  var $currentURL =
    location.protocol + "//" + location.host + location.pathname;

  $userInput.value = "";

  var url = new URL($urlString);
  var params = url.searchParams.get("paste");
  if (params !== null) {
    pasteStatus = true;
    socket.emit("client request paste", params);
    $createPaste.innerText = "Check the URL bar for the link";
  }

  $createPaste.onclick = () => {
    socket.emit("client send new paste", $userInput.value);
  };

  socket.on("server send paste data", (data) => {
    $userInput.value = data;
  });

  socket.on("paste successfully created", (randomString) => {
    window.location.href = $currentURL + "?paste=" + randomString;
  });

  socket.on("server send folder stats", (folderData) => {
    $footer.innerText = `Currently Storing ${folderData["numPastes"]} Pastes, and taking up ${folderData["size"]} Bytes`;
  });
});
