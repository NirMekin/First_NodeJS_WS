/**
 * Created by Nir Mekin on 4/23/2017.
 */
'use strict';

var Emitter = require('events');
var eventsConfig =  require('./config').events;

//This class for saving the console data
class Logger{

    constructor() {
        this.logger_string = {};
        this.key = 'console messages';
        this.logger_string[this.key]=[];
    };

    //push the data into the string (show like a JSON)
    addlog(msg){
        this.logger_string[this.key].push(msg);
    }
    //return the data
    getlog(){
        return this.logger_string;
    }

}

//requirements for changing console.log func
var fs = require('fs');
var util = require('util');
var log_file = new Logger();
var log_stdout = process.stdout;

//changing console.log func for this module only
//adding every message to console inside an object
var consoleLog = console.log;
consoleLog = function(msg) {
    log_file.addlog(msg);
    log_stdout.write(util.format(msg) + '\n');
};

//main class for adding and reducing score of instant of a player
module.exports = class Player extends Emitter.EventEmitter {

    constructor(name = "Joe Doe", win = 0, sport = "Poker") {
        super();
        this.data = log_file;
        this.player_win = win;
        this.player_name = name;
        this.sport_type = sport;
        Emitter.EventEmitter.call(this);

    };

    //add more points to score
    addPoint(points=1) {
        this.player_win+=points;
        this.emit(eventsConfig.WIN); // go to method 'print_win'
    }

    //reduce point and in case of num>0 the correct score will be 0
    //go to method 'print_lose'
    decPoint(points=1){
        if(points <= this.player_win)
            this.player_win-=points;
        else this.player_win=0;
        this.emit(eventsConfig.LOSE);

    }

    print_win(){
        consoleLog("YOU WIN");
        this.ShowScore();
    }
    print_lose(){
        consoleLog("YOU LOSE");
        this.ShowScore();
    }
    ShowScore(){
        consoleLog(this.player_name+" Won "+this.player_win+" times on "+this.sport_type+" GAME");
    }

    //return all the data (all message written before to console.log)
    getData(){
        return this.data.getlog();
    }
}

