$(function () {
  var socket = io();

  var $sendPaste = document.getElementById("sendPaste");
  var $userInput = document.getElementById("userInput");
  var $urlString = window.location.href;

  $userInput.value = "";

  $sendPaste.onclick = () => {
    socket.emit("client send new paste", $userInput.value);
  };
});
