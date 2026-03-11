const socket = io();

const username = prompt("Enter your Username");

function sendMessage() {

    const input = document.getElementById("messageInput");
    const message = username + ":" + input.value.trim();

    socket.emit("chat message", message);

    input.value = "";
}

socket.on("chat message", function(msg) {

    const li = document.createElement("li");
        li.innerHTML = "<b>" + msg.split(":")[0] + "</b>: " + msg.split(":")[1];


    const messages = document.getElementById("messages");
    messages.appendChild(li);

});