$(function () {
  var socket = io();

  var $createPaste = document.getElementById("createPasteButton");
  var $userInput = document.getElementById("userInput");
  var $urlString = window.location.href;

  $userInput.value = "";

  var url = new URL($urlString);
  var params = url.searchParams.get("paste");
  socket.emit("client request paste", params);

  $createPaste.onclick = () => {
    socket.emit("client send new paste", $userInput.value);
  };

  socket.on("server send paste data", (data) => {
    $userInput.value = data;
  });
});
