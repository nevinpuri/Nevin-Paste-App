$(function () {
  var socket = io();

  var $sendPaste = document.getElementById("sendPaste");
  var $userInput = document.getElementById("userInput");

  $sendPaste.onclick = () => {
    socket.emit("client send new paste", $userInput.value);
  };
});
