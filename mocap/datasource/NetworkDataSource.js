"use strict";

// A networked skeleton data source!
// Sends data from this client's sensor to the reconstruct-o-matic
// and receives an aggregated (hopefully more accurate and robust)
// skeleton model back.
// Optionally, don't send data if you just want to listen
// or act as a 'viewer' client
define([
    'socketio'
], function (io) {
    function NetworkDataSource(inputBcaster, outputBcaster, url) {
        this.socketInstance = io.connect(url || 'http://localhost:3000');
        this.outputBcaster = outputBcaster;
        inputBcaster.vent.rawData.add(this.sendMessage);
    }

    NetworkDataSource.prototype.start = function () {
        var that = this;
        this.socketInstance.on('response', function (data) {
            //console.log('Server returned data');
            //console.log(data);
            
            that.outputBcaster.broadcastUser(data);
        });
    };
    
    NetworkDataSource.prototype.stop = function () {
        this.socketInstance.off('response');
    };
    
    NetworkDataSource.prototype.sendMessage = function (msg) {
        this.socketInstance.emit('request', msg);
    };
    
    NetworkDataSource.prototype.sendCalibrationData = function (msg) {
        console.log('calibrating');
        this.socketInstance.emit('calibrate', msg);
    };
    
    NetworkDataSource.prototype.joinRoom = function (roomId) {
        console.log("Joining room");
        this.socketInstance.emit('subscribe', roomId);
    };
    
    NetworkDataSource.prototype.close = function () {
        this.socketInstance.off('response', this.ondata);
        this.socketInstance.leave();
    };
    
    return NetworkDataSource;
});