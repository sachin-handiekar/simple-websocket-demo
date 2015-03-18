package com.sachinhandiekar.examples;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.logging.Logger;

/**
 *
 */
@ServerEndpoint("/demo")
public class HelloworldWebSocketEndpoint {

    public static final String PING = "PING";

    private final Logger logger = Logger.getLogger(this.getClass().getName());


    @OnOpen
    public void onConnectionOpen(Session session) {
        logger.info("Connection open for " + session.getId());

        SessionHandler.clients.add(session);
    }

    @OnMessage
    public void onMessage(String message) {
        if (message.equals(PING)) {
            logger.fine("PING Received!!!");
        }

        logger.info("Message Received : " + message);
    }

    @OnClose
    public void onConnectionClose(Session session) {
        logger.info("Connection close .... " + session.getId());

        SessionHandler.clients.remove(session);
    }
}
