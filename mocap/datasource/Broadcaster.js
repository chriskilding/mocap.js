// Motion tracking event broadcaster
 define([
 'js-signals',
 'underscore'
 ], function(Signal, _) {
 
  function Broadcaster() {
    this.vent = {
      skeleton: new Signal(),
      rawData: new Signal()
    };
  }
  
  /*var tmp = _.throttle(function(user) {
    console.log(JSON.stringify(user));
  }, 10000);*/
  
  Broadcaster.prototype.broadcastUser = function(user) {       
    // the whole user object
    this.vent.rawData.dispatch(user);
    // just the skeleton
    this.vent.skeleton.dispatch(user.skeleton);
  };

  return Broadcaster;
});