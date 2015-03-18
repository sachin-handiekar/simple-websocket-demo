var webSocketURL = 'ws://' + document.location.hostname + ":" + document.location.port + document.location.pathname + 'demo';

var log = document.getElementById("log");


var webSocket;

var pingTimer;

var pingTimerInterval = 30000;

var PING_MSG = 'PING';

function openSocket() {
    // Ensures only one connection is open at a time
    if (isWebsocketOpen()) {
        writeResponse("WebSocket is already opened.");
        return;
    }

    webSocket = new WebSocket(webSocketURL);

    webSocket.onopen = function (event) {
        writeResponse('Websocket connection started... ')

        pingTimer = setInterval(function () {
            if (isWebsocketOpen()) {
                writeResponse('Sending PING message to server...')
                webSocket.send(PING_MSG);
            } else {
                writeResponse('Websocket connection is closed...');
            }
        }, pingTimerInterval);

    };


    webSocket.onclose = function (event) {
        writeResponse('Websocket connection closed...')
    };


    webSocket.onmessage = function (event) {
        writeResponse('Message received from server - ' + event.data);
    };

}


function closeSocket() {
    if (isWebsocketOpen()) {
        webSocket.close();
    } else {
        writeResponse('Websocket connection is already closed...');
    }
}


function sendMessage() {
    if (isWebsocketOpen()) {
        var text = document.getElementById("message").value;

        writeResponse('Message sent to server - ' + text)
        webSocket.send(text);

        document.getElementById("message").value = '';
    } else {
        writeResponse('Websocket connection is closed...');
    }
}

function writeResponse(text) {
    log.innerHTML += "<br/>" + text;
}

function clearLog() {
    log.innerHTML = '';
}

function isWebsocketOpen() {
    if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
        return true;
    }
    return false;
}