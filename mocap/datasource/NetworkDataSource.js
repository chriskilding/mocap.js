// A networked skeleton data source!
// Sends data from this client's sensor to the reconstruct-o-matic
// and receives an aggregated (hopefully more accurate and robust)
// skeleton model back.
// Optionally, don't send data if you just want to listen
// or act as a 'viewer' client
define([
  'socketio'
], function(io){
  var socketInstance = io.connect('http://localhost:3000');

  socketInstance.on('connection', function(socket) {  
      console.log("Socket has been opened!");  
  });

  socketInstance.on('disconnect', function(socket) { 
    console.log("Socket is closed."); 
  });
  
  var sendMessage = function(msg) {
    socketInstance.emit('request', msg);    
  };
  
  var sendCalibrationData = function(msg) {
    console.log('calibrating');
    socketInstance.emit('calibrate', msg);    
  };
    
  function NetworkDataSource(inputBcaster, outputBcaster) {
    inputBcaster.vent.rawData.add(sendMessage);
  
    // Occasionally send calibration updates
    // (just in case the sensor gets moved?)
    inputBcaster.vent.rawData.add(_.throttle(sendCalibrationData, 10000));
  
    this.ondata = socketInstance.on('response', function(data) {
      //console.log('Server returned data');
      //console.log(data);
      
      outputBcaster.broadcastUser(data);
    });
  }
  
  NetworkDataSource.prototype.joinRoom = function(roomId) {
    console.log("Joining room");
    socketInstance.emit('subscribe', roomId);
  };
  
  NetworkDataSource.prototype.close = function() {
    socketInstance.off('response', this.ondata);
    socketInstance.leave();
  };
  
  return NetworkDataSource;
});