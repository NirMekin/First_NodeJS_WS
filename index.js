'use strict';

var http = require('https');
var Player = require('./score_MDL');
var eventsConfig = require('./score_MDL/config').events;
var express = require('express');

var app = new express();

app.get('/',  (req, res) => {
    res.status(200);
    var player1  = new Player("Nir",2,"Chess");
    var player2 = new Player();

    player1.on(eventsConfig.WIN,player1.print_win);
    player1.on(eventsConfig.LOSE,player1.print_lose);
    player2.on(eventsConfig.WIN,player1.print_win);
    player2.on(eventsConfig.LOSE,player1.print_lose);

    player2.addPoint(2);
    player1.addPoint(2);
    player1.decPoint(5);

    player2.addPoint(2);
    player2.decPoint();

    res.send(player2.getData());
    res.end();
});

//create server and listen to PORT 8080
http.createServer(app).listen(8080);
console.log("Connection created and listen to PORT 8080");







