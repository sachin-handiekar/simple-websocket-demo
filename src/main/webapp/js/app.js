var webSocketURL = 'ws://' + document.location.hostname + ":" + document.location.port + document.location.pathname + 'demo';

var messages = document.getElementById("messages");

writeResponse('WebSockets URL : ' + webSocketURL);

var webSocket;

var pingTimer;

var pingTimerInterval = 30000;

var PING_MSG = 'PING';

function openSocket() {
    // Ensures only one connection is open at a time
    if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
        writeResponse("WebSocket is already opened.");
        return;
    }

    webSocket = new WebSocket(webSocketURL);

    webSocket.onopen = function (event) {
        writeResponse('Websocket connection started...')

        pingTimer = setInterval(function () {
            writeResponse('Sending PING message to server...')
            webSocket.send(PING_MSG);
        }, pingTimerInterval);

    };


    webSocket.onclose = function (event) {
        writeResponse('Websocket connection closed...')
    };


    webSocket.onmessage = function (event) {
        writeResponse(event.data);
    };

}


function closeSocket() {

    if (webSocket != null) {
        webSocket.close();
    }

}


function send(){
    var text = document.getElementById("messageinput").value;
    webSocket.send(text);
}

function writeResponse(text) {
    messages.innerHTML += "<br/>" + text;
}