$(function () {
  var socket = io();

  var $sendPaste = document.getElementById("sendPaste");

  $sendPaste.onclick = () => {
    socket.emit("client send paste", "test.txt");
  };
});
